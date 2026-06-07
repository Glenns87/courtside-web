import { z } from "zod";

export const LEVELS = ["Beginner", "Intermediate", "Gevorderd"] as const;
export const DAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"] as const;
export const LOCATIONS = [
  "Utrecht",
  "Rotterdam",
  "Den Haag",
  "Amsterdam",
  "Anders",
] as const;

export const GROUP_SIZES = ["1", "2", "3", "4", "unknown"] as const;
export const LESSON_TYPES = ["losse", "cursus", "unknown"] as const;

export const PLAY_LEVELS = ["rec", "wed", "comp"] as const;
export const TEACH_EXPERIENCE = ["geen", "kort", "midden", "ervaren"] as const;

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
  lessonType: z.enum(LESSON_TYPES).optional(),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: optionalString(30),
  locations: z.array(z.enum(LOCATIONS)).max(LOCATIONS.length).default([]),
  otherLocation: optionalString(120),
  // Honeypot: bots vullen verborgen velden vaak in. Moet leeg blijven.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof LeadSchema>;

// Simpele numerieke telefooncheck: cijfers plus gangbare scheidingstekens.
const PHONE_RE = /^[0-9+()\s.-]{6,}$/;

export const TrainerSchema = z.object({
  playLevel: z.enum(PLAY_LEVELS),
  teachExperience: z.enum(TEACH_EXPERIENCE),
  regions: z.array(z.enum(LOCATIONS)).max(LOCATIONS.length).default([]),
  otherRegion: optionalString(120),
  availability: z.string().trim().min(1).max(200),
  about: optionalString(500),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().regex(PHONE_RE).max(30),
  // Honeypot: bots vullen verborgen velden vaak in. Moet leeg blijven.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type TrainerInput = z.infer<typeof TrainerSchema>;
