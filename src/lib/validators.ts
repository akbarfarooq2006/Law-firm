import { z } from "zod";
import { CASE_CATEGORIES, TIME_SLOTS } from "./constants";

const phoneRegex = /^(\+92|0)[\s-]?3\d{2}[\s-]?\d{7}$/;

export const consultationSchema = z.object({
  client_name: z
    .string()
    .min(3, "Please enter your full name.")
    .max(120, "Name is too long."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .regex(
      phoneRegex,
      "Use Pakistani mobile format, e.g. +92 300 1234567 or 0300-1234567."
    ),
  case_category: z.enum(
    CASE_CATEGORIES.map((c) => c.value) as [string, ...string[]],
    { message: "Select your case category." }
  ),
  case_summary: z
    .string()
    .min(20, "Please describe your matter in at least 20 characters.")
    .max(2000, "Summary must be under 2000 characters."),
  preferred_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date.")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(d.getTime()) && d >= today;
    }, "Choose today or a future date."),
  time_slot: z.enum(TIME_SLOTS.map((s) => s.value) as [string, ...string[]], {
    message: "Pick a time slot between 9 AM and 7 PM PKT.",
  }),
  meeting_type: z.enum(["in_person", "online"], {
    message: "Choose how you'd like to meet.",
  }),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address."),
  subject: z.string().min(2, "Add a short subject.").max(150),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters.")
    .max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      })
    )
    .min(1)
    .max(24),
  session_id: z.uuid().optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
