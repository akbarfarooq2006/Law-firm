"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Video,
} from "lucide-react";
import { CASE_CATEGORIES, SITE, TIME_SLOTS } from "@/lib/constants";
import { todayISO } from "@/lib/utils";
import {
  consultationSchema,
  type ConsultationInput,
} from "@/lib/validators";
import {
  submitConsultation,
  type ConsultationResult,
} from "@/app/actions/consultations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const inputError = "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-red-600">{message}</p>;
}

export function ConsultationForm() {
  const [result, setResult] = useState<ConsultationResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { meeting_type: "in_person" },
  });

  const onSubmit = async (values: ConsultationInput) => {
    setResult(null);
    const res = await submitConsultation(values);
    setResult(res);
    if (res.ok) reset({ meeting_type: "in_person" });
  };

  if (result?.ok) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-emerald-600" />
        <h3 className="mt-4 font-display text-xl font-bold text-navy-950">
          Consultation Requested
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
          JazakAllah for your trust. Our office will confirm your slot via call or
          WhatsApp within one working day.
          {result.reference && (
            <>
              {" "}
              Your reference:{" "}
              <span className="font-mono font-bold text-navy-950">
                {result.reference}
              </span>
            </>
          )}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="outline" asChild>
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              Confirm faster on WhatsApp
            </a>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setResult(null)}
          >
            Book another consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="client_name">Full Name *</Label>
          <Input
            id="client_name"
            placeholder="Muhammad Ali Khan"
            autoComplete="name"
            className={cn(errors.client_name && inputError)}
            {...register("client_name")}
          />
          <FieldError message={errors.client_name?.message} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone / WhatsApp *</Label>
          <Input
            id="phone"
            inputMode="tel"
            placeholder="+92 300 1234567"
            autoComplete="tel"
            className={cn(errors.phone && inputError)}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className={cn(errors.email && inputError)}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="case_category">Case Category *</Label>
        <Select
          id="case_category"
          defaultValue=""
          className={cn(errors.case_category && inputError)}
          {...register("case_category")}
        >
          <option value="" disabled>
            Select the nature of your matter…
          </option>
          {CASE_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
        <FieldError message={errors.case_category?.message as string | undefined} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="preferred_date">Preferred Date *</Label>
          <Input
            id="preferred_date"
            type="date"
            min={todayISO()}
            className={cn(errors.preferred_date && inputError)}
            {...register("preferred_date")}
          />
          <FieldError message={errors.preferred_date?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="time_slot">Time Slot (PKT) *</Label>
          <Select
            id="time_slot"
            defaultValue=""
            className={cn(errors.time_slot && inputError)}
            {...register("time_slot")}
          >
            <option value="" disabled>
              Choose a time…
            </option>
            {TIME_SLOTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
          <FieldError message={errors.time_slot?.message as string | undefined} />
        </div>
      </div>

      {/* Meeting mode */}
      <div className="space-y-1.5">
        <Label>Preferred Mode *</Label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
              "has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50",
              errors.meeting_type ? "border-red-300" : "border-navy-200 hover:border-navy-300"
            )}
          >
            <input
              type="radio"
              value="in_person"
              className="sr-only"
              {...register("meeting_type")}
            />
            <Building2 className="mt-0.5 size-5 shrink-0 text-navy-700" />
            <span>
              <span className="block text-sm font-semibold text-navy-950">
                In-Office — Clifton Chamber
              </span>
              <span className="mt-0.5 block text-xs text-navy-500">
                Executive Towers, Block 5, Clifton
              </span>
            </span>
          </label>
          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
              "has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50",
              errors.meeting_type ? "border-red-300" : "border-navy-200 hover:border-navy-300"
            )}
          >
            <input
              type="radio"
              value="online"
              className="sr-only"
              {...register("meeting_type")}
            />
            <Video className="mt-0.5 size-5 shrink-0 text-navy-700" />
            <span>
              <span className="block text-sm font-semibold text-navy-950">
                Virtual — Video / Phone Call
              </span>
              <span className="mt-0.5 block text-xs text-navy-500">
                Zoom or WhatsApp video, anywhere in Pakistan or abroad
              </span>
            </span>
          </label>
        </div>
        <FieldError message={errors.meeting_type?.message} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="case_summary">Brief Summary of Your Matter *</Label>
        <Textarea
          id="case_summary"
          rows={5}
          maxLength={2000}
          placeholder="Describe your situation in a few sentences — parties involved, property/asset location, deadlines, and what outcome you seek. Please do NOT include passwords or OTPs."
          className={cn(errors.case_summary && inputError)}
          {...register("case_summary")}
        />
        <p className="text-[11px] text-navy-400">
          Sharing details here is protected by attorney-client confidentiality norms,
          though a formal engagement letter is required for representation.
        </p>
        <FieldError message={errors.case_summary?.message} />
      </div>

      {result && !result.ok && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {result.error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting securely…
          </>
        ) : (
          <>
            <CalendarCheck className="size-4" />
            Request Confidential Consultation
          </>
        )}
      </Button>
      <p className="text-center text-xs text-navy-500">
        {SITE.consultationFeeLabel} · Payable at appointment · No obligation after
        first meeting
      </p>
    </form>
  );
}
