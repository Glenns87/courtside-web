"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { PostHog } from "posthog-node";
import {
  LeadIntentSchema,
  LeadSchema,
  TrainerSchema,
  type LeadInput,
  type TrainerInput,
} from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

const DEFAULT_FROM_EMAIL = "Courtside <onboarding@resend.dev>";

/**
 * Server-side PostHog capture. Best-effort: analytics-fouten mogen de
 * Resend-flow of de redirect nooit blokkeren. distinct_id is een random UUID
 * per request — bewust geen e-mail/telefoon/naam (PII-veilig).
 */
async function captureServerEvent(
  event: string,
  properties: Record<string, unknown>,
): Promise<void> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  try {
    const posthog = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
    posthog.capture({ distinctId: randomUUID(), event, properties });
    await posthog.shutdown();
  } catch (err) {
    console.error("[captureServerEvent] posthog capture failed", err);
  }
}

export type LeadFormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * Stap 1 van de funnel: slaat niveau + planning op in de URL en stuurt
 * door naar /aanvragen voor contactgegevens.
 */
export async function submitLeadIntent(data: unknown): Promise<void> {
  const parsed = LeadIntentSchema.safeParse(data);
  if (!parsed.success) {
    redirect("/");
  }

  const params = new URLSearchParams({
    level: parsed.data.level,
    days: parsed.data.days.join(","),
    times: parsed.data.times.join(","),
  });
  redirect(`/aanvragen?${params.toString()}`);
}

/**
 * Stap 2 van de funnel: valideert, rate-limit per IP, mailt notificatie
 * naar bookings, redirect naar bedankt-pagina.
 */
export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = {
    level: formData.get("level"),
    days: splitCsv(formData.get("days")),
    times: splitCsv(formData.get("times")),
    groupSize: formData.get("groupSize") ?? "",
    lessonType: formData.get("lessonType") || undefined,
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    locations: splitCsv(formData.get("locations")),
    otherLocation: formData.get("otherLocation") ?? "",
    website: formData.get("website") ?? "",
  };

  // Honeypot: bot trapt erin → veins succes, sla niets op.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    redirect("/aanvragen/bedankt");
  }

  const result = LeadSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join(".") || "_";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Controleer je gegevens en probeer opnieuw.",
      fieldErrors,
    };
  }

  const ip = await getClientIp();
  const rl = rateLimit(`lead:${ip}`, { max: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return {
      ok: false,
      error: `Te veel pogingen. Probeer het over ${rl.retryAfterSeconds} seconden opnieuw.`,
    };
  }

  try {
    await sendLeadNotification(result.data);
  } catch (err) {
    console.error("[submitLead] resend failed", err);
    return {
      ok: false,
      error:
        "Versturen lukte niet. Probeer het zo opnieuw of mail rechtstreeks naar bookings@courtside.nl.",
    };
  }

  await captureServerEvent("lead_submitted", {
    level: result.data.level,
    days: result.data.days,
    times: result.data.times,
    groupSize: result.data.groupSize,
    lessonType: result.data.lessonType,
    locationsCount: result.data.locations.length,
  });

  redirect("/aanvragen/bedankt");
}

/**
 * Trainer-aanmelding: zelfde patroon als submitLead, maar gescheiden funnel
 * zodat trainer-opvolging niet door de speler-leads loopt.
 */
export async function submitTrainerApplication(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = {
    playLevel: formData.get("playLevel") ?? "",
    teachExperience: formData.get("teachExperience") ?? "",
    regions: splitCsv(formData.get("regions")),
    otherRegion: formData.get("otherRegion") ?? "",
    availability: formData.get("availability") ?? "",
    about: formData.get("about") ?? "",
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    website: formData.get("website") ?? "",
  };

  // Honeypot: bot trapt erin → veins succes, sla niets op.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    redirect("/trainer-worden/bedankt");
  }

  const result = TrainerSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join(".") || "_";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Controleer je gegevens en probeer opnieuw.",
      fieldErrors,
    };
  }

  const ip = await getClientIp();
  const rl = rateLimit(`trainer:${ip}`, { max: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return {
      ok: false,
      error: `Te veel pogingen. Probeer het over ${rl.retryAfterSeconds} seconden opnieuw.`,
    };
  }

  try {
    await sendTrainerNotification(result.data);
  } catch (err) {
    console.error("[submitTrainerApplication] resend failed", err);
    return {
      ok: false,
      error:
        "Versturen lukte niet. Probeer het zo opnieuw of mail rechtstreeks naar bookings@courtside.nl.",
    };
  }

  await captureServerEvent("trainer_application_submitted", {
    playLevel: result.data.playLevel,
    teachExperience: result.data.teachExperience,
    regionsCount: result.data.regions.length,
  });

  redirect("/trainer-worden/bedankt");
}

function splitCsv(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string" || !value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first) return first.trim();
  }
  return h.get("x-real-ip") ?? "unknown";
}

async function sendLeadNotification(lead: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    throw new Error(
      "RESEND_API_KEY of LEAD_NOTIFICATION_EMAIL ontbreekt in env",
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL,
    to,
    replyTo: lead.email,
    subject: `Nieuwe aanvraag — ${lead.level} (${lead.days.join("/")} · ${lead.times.join("/")})`,
    text: formatLeadEmail(lead),
  });

  if (error) throw new Error(error.message ?? "Resend error");
}

function formatLeadEmail(lead: LeadInput): string {
  const lessonTypeLabels: Record<typeof lead.lessonType & string, string> = {
    losse: "Losse les",
    cursus: "Cursus",
    unknown: "Weet nog niet",
  };
  const lines = [
    "Nieuwe aanvraag via courtside.nl",
    "",
    `Niveau:         ${lead.level}`,
    `Dagen:          ${lead.days.join(", ")}`,
    `Tijden:         ${lead.times.join(", ")}`,
    ...(lead.lessonType
      ? [`Type lessen:    ${lessonTypeLabels[lead.lessonType]}`]
      : []),
    `Aantal personen: ${lead.groupSize === "unknown" ? "Weet nog niet" : lead.groupSize}`,
    `Locaties:       ${lead.locations.length ? lead.locations.join(", ") : "—"}`,
  ];
  if (lead.otherLocation) {
    lines.push(`Andere locatie: ${lead.otherLocation}`);
  }
  lines.push("");
  lines.push(`E-mail:         ${lead.email}`);
  lines.push(`Telefoon:       ${lead.phone ?? "—"}`);
  return lines.join("\n");
}

async function sendTrainerNotification(trainer: TrainerInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    throw new Error(
      "RESEND_API_KEY of LEAD_NOTIFICATION_EMAIL ontbreekt in env",
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL,
    to,
    replyTo: trainer.email,
    subject: `Nieuwe trainer-aanmelding: ${trainer.name}`,
    text: formatTrainerEmail(trainer),
  });

  if (error) throw new Error(error.message ?? "Resend error");
}

function formatTrainerEmail(trainer: TrainerInput): string {
  const playLevelLabels: Record<TrainerInput["playLevel"], string> = {
    rec: "Recreatief",
    wed: "Wedstrijd",
    comp: "Hoog-competitief",
  };
  const teachLabels: Record<TrainerInput["teachExperience"], string> = {
    geen: "Nog geen",
    kort: "Minder dan 1 jaar",
    midden: "1–3 jaar",
    ervaren: "Meer dan 3 jaar",
  };

  const lines = [
    "Nieuwe trainer-aanmelding via courtside.nl",
    "",
    `Naam:            ${trainer.name}`,
    `E-mail:          ${trainer.email}`,
    `Telefoon:        ${trainer.phone}`,
    "",
    `Speel-niveau:    ${playLevelLabels[trainer.playLevel]}`,
    `Lesgeef-ervaring: ${teachLabels[trainer.teachExperience]}`,
    `Regio's:         ${trainer.regions.length ? trainer.regions.join(", ") : "—"}`,
  ];
  if (trainer.otherRegion) {
    lines.push(`Andere regio:    ${trainer.otherRegion}`);
  }
  lines.push(`Beschikbaarheid: ${trainer.availability}`);
  if (trainer.about) {
    lines.push("");
    lines.push("Over zichzelf:");
    lines.push(trainer.about);
  }
  return lines.join("\n");
}
