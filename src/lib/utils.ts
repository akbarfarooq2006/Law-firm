import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an ISO date string for display, e.g. "12 Aug 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Karachi",
  });
}

/** Rough reading time in minutes based on word count. */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const PK_TZ_OFFSET = "+05:00";

/** Combine a `YYYY-MM-DD` date and `HH:mm` slot into an ISO instant in PKT. */
export function combineDateAndSlot(date: string, slot: string): string {
  return new Date(`${date}T${slot}:00${PK_TZ_OFFSET}`).toISOString();
}

export function todayISO(): string {
  const now = new Date();
  // Shift to Karachi calendar date
  const pkt = new Date(now.getTime() + (5 * 60 + now.getTimezoneOffset()) * 60_000);
  return pkt.toISOString().slice(0, 10);
}
