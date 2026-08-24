"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { submitInquiry, type InquiryResult } from "@/app/actions/inquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const inputError = "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20";

export function ContactForm() {
  const [result, setResult] = useState<InquiryResult | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactInput) => {
    setResult(null);
    const res = await submitInquiry(values);
    setResult(res);
    if (res.ok) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="c-name">Your Name *</Label>
          <Input
            id="c-name"
            placeholder="Full name"
            className={cn(errors.name && inputError)}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-email">Email *</Label>
          <Input
            id="c-email"
            type="email"
            placeholder="you@example.com"
            className={cn(errors.email && inputError)}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="c-subject">Subject *</Label>
        <Input
          id="c-subject"
          placeholder="e.g. Property verification for Gulshan apartment"
          className={cn(errors.subject && inputError)}
          {...register("subject")}
        />
        {errors.subject && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="c-message">Message *</Label>
        <Textarea
          id="c-message"
          rows={6}
          placeholder="How can our advocates help you?"
          className={cn(errors.message && inputError)}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.message.message}</p>
        )}
      </div>

      {result && !result.ok && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {result.error}
        </p>
      )}

      {result?.ok ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
          <CheckCircle2 className="size-6 shrink-0 text-emerald-600" />
          <p className="text-sm font-medium text-navy-800">
            Message received. We reply to all inquiries within one working day.
          </p>
        </div>
      ) : (
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="size-4" /> Send Message
            </>
          )}
        </Button>
      )}
    </form>
  );
}
