"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { combineDateAndSlot } from "@/lib/utils";
import { consultationSchema, type ConsultationInput } from "@/lib/validators";

export interface ConsultationResult {
  ok: boolean;
  reference?: string;
  error?: string;
}

export async function submitConsultation(
  input: ConsultationInput
): Promise<ConsultationResult> {
  const parsed = consultationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please review the highlighted fields." };
  }

  const data = parsed.data;
  const preferredAt = combineDateAndSlot(data.preferred_date, data.time_slot);

  const admin = createAdminClient();

  // Supabase not configured — demo mode so the site remains testable.
  if (!admin) {
    console.warn("[consultations] Supabase not configured; simulating insert.");
    const ref = `KLA-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    return {
      ok: true,
      reference: ref,
    };
  }

  const { data: row, error } = await admin
    .from("consultations")
    .insert({
      client_name: data.client_name,
      email: data.email,
      phone: data.phone,
      case_category: data.case_category,
      case_summary: data.case_summary,
      preferred_at: preferredAt,
      meeting_type: data.meeting_type,
      status: "pending",
    })
    .select("reference_code")
    .single();

  if (error || !row) {
    console.error("[consultations] Insert failed:", error?.message);
    return {
      ok: false,
      error:
        "We couldn't record your request right now. Please try again or reach us on WhatsApp.",
    };
  }

  return { ok: true, reference: row.reference_code ?? undefined };
}
