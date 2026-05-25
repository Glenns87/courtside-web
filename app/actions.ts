"use server";

import { redirect } from "next/navigation";

type Level = "Start" | "Midden" | "Gevorderd";
type Day = "Ma" | "Di" | "Wo" | "Do" | "Vr" | "Za" | "Zo";

type LeadIntent = {
  level: Level;
  days: Day[];
  times: string[];
};

/**
 * Slaat de initiële intent van de bezoeker op en redirect naar de contact-stap.
 * v1: stub — logt alleen. Claude Code breidt dit uit met:
 *   - Zod-validatie
 *   - Rate-limiting via @upstash/ratelimit
 *   - Write naar Sanity (leads document)
 *   - Resend email notificatie naar bookings@courtside.nl
 *   - PostHog server-side capture "lead_intent_submitted"
 */
export async function submitLeadIntent(data: LeadIntent): Promise<void> {
  // TODO: Claude Code — vervang door Zod parse + Sanity write + Resend + PostHog
  console.log("[submitLeadIntent]", data);

  const params = new URLSearchParams({
    level: data.level,
    days: data.days.join(","),
    times: data.times.join(","),
  });
  redirect(`/aanvragen?${params.toString()}`);
}
