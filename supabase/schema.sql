-- ════════════════════════════════════════════════════════════════════════
--  RIZVI LAW ASSOCIATES — SUPABASE SCHEMA
--  Karachi legal practice website (Next.js App Router)
--  Run this in: Supabase Dashboard → SQL Editor → New query → paste → Run
-- ════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────
--  ENUMS
-- ─────────────────────────────────────────────────────────

create type public.meeting_type   as enum ('in_person', 'online');
create type public.booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type public.chat_role      as enum ('user', 'assistant');

-- ─────────────────────────────────────────────────────────
--  ADMIN HELPER — who counts as an admin for RLS?
--  Add rows to admin_users for every Supabase Auth user that
--  should manage consultations / articles / chat logs.
-- ─────────────────────────────────────────────────────────

create table public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke execute on function public.is_admin() from anon, authenticated;
grant execute on function public.is_admin() to authenticated;

-- ─────────────────────────────────────────────────────────
--  TABLES
-- ─────────────────────────────────────────────────────────

-- 1) CONSULTATIONS — appointment booking form (/contact, /services/*)
create table public.consultations (
  id             uuid primary key default gen_random_uuid(),
  reference_code text unique generated always as
                   ('KLA-' || upper(substring(id::text from 1 for 8))) stored,
  client_name    text not null check (char_length(client_name) between 3 and 120),
  email          text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone          text not null check (phone ~ '^\+?[0-9][0-9 \-]{7,17}$'), -- +92 300 1234567 / 03XX-XXXXXXX
  case_category  text not null check (case_category in (
                    'corporate_commercial','property_real_estate','family_law',
                    'criminal_bail','tax_customs','cyber_crime_peca','other')),
  case_summary   text not null check (char_length(case_summary) between 20 and 2000),
  preferred_at   timestamptz not null,
  meeting_type   meeting_type not null default 'in_person',
  status         booking_status not null default 'pending',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index consultations_preferred_at_idx on public.consultations (preferred_at);
create index consultations_status_idx      on public.consultations (status);
create index consultations_created_idx     on public.consultations (created_at desc);

-- 2) CONTACT INQUIRIES — general message form
create table public.contact_inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 2 and 120),
  email      text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject    text not null check (char_length(subject) between 2 and 150),
  message    text not null check (char_length(message) between 10 and 5000),
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

create index contact_inquiries_created_idx on public.contact_inquiries (created_at desc);

-- 3) ARTICLES — Legal Insights blog (public read, admin write)
create table public.articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null check (char_length(title) between 5 and 200),
  excerpt      text,
  content_md   text not null,
  author       text not null default 'Rizvi Law Associates',
  tags         text[] not null default '{}',
  reading_time int,                                   -- minutes (optional)
  published_at timestamptz not null default now(),    -- NULL = draft, never shown publicly
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index articles_published_idx on public.articles (published_at desc);

-- 4) CHAT LOGS — anonymous AI-chat analytics
create table public.chat_logs (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  role       chat_role not null,
  message    text not null check (char_length(message) <= 8000),
  timestamp  timestamptz not null default now()
);

create index chat_logs_session_idx  on public.chat_logs (session_id, timestamp);
create index chat_logs_created_idx  on public.chat_logs (timestamp desc);

-- ─────────────────────────────────────────────────────────
--  updated_at AUTO-TOUCH
-- ─────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

create trigger consultations_updated_at before update on public.consultations
  for each row execute function public.set_updated_at();
create trigger articles_updated_at before update on public.articles
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────
--  ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────

alter table public.consultations      enable row level security;
alter table public.contact_inquiries  enable row level security;
alter table public.articles           enable row level security;
alter table public.chat_logs          enable row level security;
alter table public.admin_users        enable row level security;

-- Admins manage their own registry
create policy "admins manage admin_users"
  on public.admin_users for all
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- consultations: anyone can REQUEST; only admins can view/update/cancel
create policy "consultations_public_insert"
  on public.consultations for insert to anon, authenticated
  with check (true);

create policy "consultations_admin_select"
  on public.consultations for select to authenticated
  using (public.is_admin());

create policy "consultations_admin_update"
  on public.consultations for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "consultations_admin_delete"
  on public.consultations for delete to authenticated
  using (public.is_admin());

-- contact_inquiries: same pattern
create policy "inquiries_public_insert"
  on public.contact_inquiries for insert to anon, authenticated
  with check (true);

create policy "inquiries_admin_select"
  on public.contact_inquiries for select to authenticated
  using (public.is_admin());

create policy "inquiries_admin_update"
  on public.contact_inquiries for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "inquiries_admin_delete"
  on public.contact_inquiries for delete to authenticated
  using (public.is_admin());

-- articles: published posts are public; drafts & all writes are admin-only
create policy "articles_public_read_published"
  on public.articles for select to anon, authenticated
  using (published_at is not null and published_at <= now());

create policy "articles_admin_select"
  on public.articles for select to authenticated
  using (public.is_admin());

create policy "articles_admin_insert"
  on public.articles for insert to authenticated
  with check (public.is_admin());

create policy "articles_admin_update"
  on public.articles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "articles_admin_delete"
  on public.articles for delete to authenticated
  using (public.is_admin());

-- chat_logs: public may append their own session turns; only admins read/purge.
-- (The server route inserts via service-role key anyway; this policy also
--  permits direct client logging without exposing other sessions.)
create policy "chat_logs_public_insert"
  on public.chat_logs for insert to anon, authenticated
  with check (true);

create policy "chat_logs_admin_select"
  on public.chat_logs for select to authenticated
  using (public.is_admin());

create policy "chat_logs_admin_delete"
  on public.chat_logs for delete to authenticated
  using (public.is_admin());

-- ─────────────────────────────────────────────────────────
--  SEED — Legal Insights starter articles (idempotent)
-- ─────────────────────────────────────────────────────────

insert into public.articles (slug, title, excerpt, content_md, author, tags, reading_time, published_at)
values
(
  'step-by-step-property-verification-karachi',
  'Step-by-Step Guide to Property Verification in Karachi',
  'A practical checklist for verifying KDA/SBCA records, registry papers and encumbrances before you buy any property in Karachi.',
  E'Buying property in Karachi without verification is the single most common cause of land litigation in Sindh. Before paying **any** token or bayana, complete the following checks.\n\n## 1. Collect the title documents\nAsk the seller for:\n\n- Registered sale deed / registry, or allotment letter + transfer letter (for leased KDA/LEA plots)\n- Latest property tax challans (excise & taxation record)\n- Approved building plan (SBCA) for constructed units\n- Seller''s CNIC and, if applicable, Wakala Nama (power of attorney)\n\n## 2. Verify at the Sub-Registrar office\nApply for a certified copy of the registered deed at the concerned Sub-Registrar (e.g. Clifton, Saddar, Korangi). A certified copy confirms the deed actually exists in the official register.\n\n## 3. Check mutation & revenue records\nFor open land, inspect the *Record of Rights* (fard-e-malkiat) at the Board of Revenue / Mukhtiarkar office to confirm the seller appears as owner after the last mutation (intiqal).\n\n## 4. Confirm SBCA / builder status\nFor apartments, verify the project is approved by the **Sindh Building Control Authority** and that the developer has no pending regularization issues.\n\n## 5. Search for encumbrances\nCheck for bank mortgages, court attachments (*zabti*) or injunction orders in the relevant courts. We run formal searches in the High Court of Sindh and City Courts Karachi as part of our due-diligence retainer.\n\n## 6. Execute a properly drafted transfer\nUse a lawyer-drafted agreement to sell, then register the final conveyance. Never rely on unregistered agreements alone.\n\n> **Disclaimer:** This guide is general information under Sindh law and not legal advice for a specific transaction. Book a consultation for a written title opinion.',
  'Ahmed Rizvi, Advocate High Court',
  ARRAY['Property','Karachi','Verification'],
  6, now() - interval '21 days'
),
(
  'understanding-sindh-rental-premises-ordinance',
  'Understanding the Sindh Rented Premises Ordinance: Rights of Landlords & Tenants',
  'Rent agreements, rent controllers, evictions and deposits in Karachi explained under the Sindh Rented Premises Ordinance.',
  E'The **Sindh Rented Premises Ordinance, 1979** governs most residential and commercial tenancies in Karachi, enforced through the office of the Rent Controller.\n\n## Written tenancy agreement is mandatory\nEvery tenancy must be recorded in writing and submitted to the Rent Controller within seven days. An unregistered agreement weakens both parties'' positions.\n\n## Landlord rights\n- Fair market rent revisions as permitted by the Ordinance\n- Eviction on statutory grounds: non-payment, subletting without consent, structural damage, personal requirement\n- Recovery of arrears through a rent eviction petition rather than self-help measures\n\n## Tenant rights\n- Protection from eviction except on statutory grounds\n- Receipts for every rent payment\n- Reasonable notice before landlord inspection\n\n## The eviction process\nA petition is filed before the **Rent Controller (Karachi East/West/South/Central/Malir)** having territorial jurisdiction. After service and evidence, the Controller decides within the timelines prescribed. Appeals lie to the Sindh High Court on questions of law.\n\n## Practical tips for Karachi landlords\n1. Never collect more than one month''s advance plus refundable security unless agreed in writing.\n2. Keep CNIC copies of every occupant.\n3. Issue monthly receipts — courts treat undocumented cash rents harshly.\n\nOur chamber regularly represents landlords and tenants before Rent Controllers across Karachi City Courts.',
  'Fatima Rizvi, Associate',
  ARRAY['Rent','Tenant','Landlord','Sindh'],
  5, now() - interval '14 days'
),
(
  'how-to-obtain-succession-certificate-sindh',
  'How to Obtain a Succession Certificate in Sindh',
  'Documents, procedure and timeline for obtaining a succession certificate from the District Court for movable assets of a deceased person in Pakistan.',
  E'When a person dies leaving bank accounts, shares, prize bonds or other **movable assets**, the legal heirs need a **succession certificate** issued by the civil/family judge with jurisdiction over where the deceased ordinarily resided.\n\n## Step 1 — Gather core documents\n- Death certificate from NADRA / union council\n- CNICs of all legal heirs\n- Family registration certificate (NADRA FRC)\n- Asset details: account numbers, share folios, bond serials\n\n## Step 2 — File the petition\nA petition under the **Succession Act, 1925** is filed in the District Courts at Karachi (City Courts) or Malir, depending on residence. Public notice is issued in newspapers inviting objections.\n\n## Step 3 — Contested vs uncontested\nMost certificates are granted uncontested within roughly **6–10 weeks** once the notice period expires. If a relative objects, the matter proceeds as a suit with evidence — this is where experienced counsel matters.\n\n## Step 4 — Bond and issuance\nHeirs furnish a surety bond equal to the asset value, after which certified copies are provided to each bank/institution.\n\n> Note: immovable property does **not** pass via succession certificate — heirs use inheritance mutations (intiqal) and, where needed, declaration suits instead.\n\nWe handle the entire process on a transparent, milestone-based fee schedule in PKR.',
  'Ahmed Rizvi, Advocate High Court',
  ARRAY['Succession','Family Law','Inheritance'],
  4, now() - interval '7 days'
)
on conflict (slug) do nothing;

-- ════════════════════════════════════════════════════════
--  POST-RUN CHECKLIST
--  1. Authentication → invite your admin email, confirm signup.
--  2. INSERT INTO public.admin_users (user_id) VALUES ('<auth-user-uuid>');
--  3. Set env vars in Next.js (.env.local) and redeploy.
-- ════════════════════════════════════════════════════════
