"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { contactSchema, type ContactInput } from "@/lib/validators";

export interface InquiryResult {
  ok: boolean;
  error?: string;
}

export async function submitInquiry(input: ContactInput): Promise<InquiryResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please review the highlighted fields." };
  }

  const admin = createAdminClient();

  if (!admin) {
    console.warn("[inquiries] Supabase not configured; simulating insert.");
    return { ok: true };
  }

  const { error } = await admin
    .from("contact_inquiries")
    .insert(parsed.data);

  if (error) {
    console.error("[inquiries] Insert failed:", error.message);
    return {
      ok: false,
      error: "Message could not be sent. Please email us directly instead.",
    };
  }

  return { ok: true };
}
