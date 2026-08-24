# Rizvi Law Associates — Karachi Legal Practice Website

A modern, high-converting full-stack website for an elite legal practice in Karachi,
Pakistan — Next.js App Router + Supabase + streaming AI legal assistant.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Frontend | Next.js 16 (App Router, TypeScript), Tailwind CSS v4, shadcn-style UI primitives, Lucide icons, Framer Motion |
| Backend | Supabase (PostgreSQL + RLS), Server Actions |
| AI Chatbot | `/api/chat` route with OpenAI-compatible **streaming** responses |
| Forms | React Hook Form + Zod |

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in your keys (or leave empty for demo mode)
npm run dev
```

Open http://localhost:3000.

> The site runs fully in **demo mode** without any env vars: blog articles come from
> bundled seeds, forms simulate success, and the chatbot streams keyword-based canned
> answers. Add Supabase + OpenAI keys to go live.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. SQL Editor → paste the contents of [`supabase/schema.sql`](supabase/schema.sql) → Run.
   This creates `consultations`, `contact_inquiries`, `articles`, `chat_logs`,
   `admin_users` with enums, indexes and full Row Level Security policies.
3. Copy `Project URL` + `anon key` → `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Add the `service_role` key as
   `SUPABASE_SERVICE_ROLE_KEY` (**server-only**).
4. Admin access: create a user in Authentication → then
   `INSERT INTO public.admin_users (user_id) VALUES ('<auth-user-uuid>');`

## AI Legal Assistant

- Widget: floating bottom-right ("Karachi Legal AI") with quick prompt pills,
  streaming replies, session tracking and booking CTAs.
- Route: `src/app/api/chat/route.ts` — validates input (Zod), rate-limits per IP,
  streams from any OpenAI-compatible endpoint (`OPENAI_BASE_URL`, `OPENAI_MODEL`),
  falls back to offline demo mode without keys, and logs turns to `chat_logs`.
- Guardrails live in the system prompt: Sindh/Pakistan scope, mandatory disclaimer,
  no attorney-client relationship, booking handoff.

## Project Structure

```
src/
├─ app/
│  ├─ page.tsx              # Home (hero, badges, practices, why-us, stats, testimonials)
│  ├─ about/                # Chamber bio, timeline, values, team
│  ├─ services/             # Practice areas index
│  │  └─ [slug]/            # Detail pages w/ FAQs + booking sidebar (static params)
│  ├─ insights/             # Blog list (Supabase, force-dynamic)
│  │  └─ [slug]/            # Article detail (markdown)
│  ├─ contact/              # Booking form + Google Map + inquiry form
│  ├─ api/chat/route.ts     # Streaming AI endpoint
│  ├─ actions/              # Server Actions (consultations, inquiries)
│  └─ layout.tsx            # Fonts, metadata, navbar/footer/chat/toaster
├─ components/
│  ├─ ui/                   # Button, Card, Input, Select, Accordion…
│  ├─ site/                 # Navbar, Footer, Hero, sections, Reveal animations
│  ├─ forms/                # Consultation & Contact forms (RHF+Zod)
│  └─ chat/chat-widget.tsx  # Floating AI assistant
├─ lib/
│  ├─ supabase/             # client/server/admin clients + queries + seed articles
│  ├─ constants.ts          # Firm info, nav, time slots, case categories
│  ├─ practice-areas.ts     # 6 practice desks incl. FAQs & Urdu terms
│  ├─ validators.ts         # Zod schemas (+92 phone format, dates, chat payload)
│  └─ utils.ts              # cn(), PKT date helpers, formatting
└─ types/
supabase/schema.sql         # Tables, constraints, indexes, RLS, seeds
```

## Localization Notes

- Currency in PKR (Rs.), office hours Mon–Sat 9 AM–7 PM PKT, Asia/Karachi timezone.
- Pakistani phone validation: `+92 3XX XXXXXXX` / `03XX-XXXXXXX`.
- Urdu legal terminology surfaced per practice area (*Wakala*, *Khula/Kula*,
  *Fard-e-Malkiat*, *Intiqal*…).
