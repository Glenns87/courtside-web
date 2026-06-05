import { z } from "zod";

export const LEVELS = ["Start", "Midden", "Gevorderd"] as const;
export const DAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"] as const;
export const LOCATIONS = [
  "Utrecht",
  "Amersfoort",
  "Nieuwegein",
  "Amsterdam",
  "Anders",
] as const;

export const GROUP_SIZES = ["1", "2", "3", "4", "unknown"] as const;

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export const LeadIntentSchema = z.object({
  level: z.enum(LEVELS),
  days: z.array(z.enum(DAYS)).min(1).max(DAYS.length),
  times: z.array(z.string().regex(TIME_RE)).min(1).max(24),
});

export type LeadIntentInput = z.infer<typeof LeadIntentSchema>;

const optionalString = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const LeadSchema = LeadIntentSchema.extend({
  groupSize: z.enum(GROUP_SIZES),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: optionalString(30),
  locations: z.array(z.enum(LOCATIONS)).max(LOCATIONS.length).default([]),
  otherLocation: optionalString(120),
  // Honeypot: bots vullen verborgen velden vaak in. Moet leeg blijven.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof LeadSchema>;
