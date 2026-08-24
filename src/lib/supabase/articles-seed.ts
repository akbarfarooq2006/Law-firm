import type { Article } from "@/types";

/**
 * Fallback content used when Supabase is not yet configured (or the
 * `articles` table is empty). Mirrors the seed rows in supabase/schema.sql.
 */
export const SEED_ARTICLES: Article[] = [
  {
    id: "seed-property-verification",
    slug: "step-by-step-property-verification-karachi",
    title: "Step-by-Step Guide to Property Verification in Karachi",
    excerpt:
      "A practical checklist for verifying KDA/SBCA records, registry papers and encumbrances before you buy any property in Karachi.",
    author: "Ahmed Rizvi, Advocate High Court",
    tags: ["Property", "Karachi", "Verification"],
    reading_time: 6,
    published_at: new Date(Date.now() - 21 * 86_400_000).toISOString(),
    content_md: `Buying property in Karachi without verification is the single most common cause of land litigation in Sindh. Before paying **any** token or bayana, complete the following checks.

## 1. Collect the title documents

Ask the seller for:

- Registered sale deed / registry, or allotment letter + transfer letter (for leased KDA plots)
- Latest property tax challans (excise & taxation record)
- Approved building plan (SBCA) for constructed units
- Seller's CNIC and, if applicable, Wakala Nama (power of attorney)

## 2. Verify at the Sub-Registrar office

Apply for a certified copy of the registered deed at the concerned Sub-Registrar (e.g. Clifton, Saddar, Korangi). A certified copy confirms the deed actually exists in the official register.

## 3. Check mutation & revenue records

For open land, inspect the *Record of Rights* (fard-e-malkiat) at the Board of Revenue / Mukhtiarkar office to confirm the seller appears as owner after the last mutation (intiqal).

## 4. Confirm SBCA / builder status

For apartments, verify the project is approved by the **Sindh Building Control Authority** and that the developer has no pending regularization issues.

## 5. Search for encumbrances

Check for bank mortgages, court attachments (*zabti*) or injunction orders in the relevant courts. We run formal searches in the High Court of Sindh and City Courts Karachi as part of our due-diligence retainer.

## 6. Execute a properly drafted transfer

Use a lawyer-drafted agreement to sell, then register the final conveyance. Never rely on unregistered agreements alone.

> **Disclaimer:** This guide is general information under Sindh law and not legal advice for a specific transaction. Book a consultation for a written title opinion.`,
  },
  {
    id: "seed-rental-premises",
    slug: "understanding-sindh-rental-premises-ordinance",
    title:
      "Understanding the Sindh Rented Premises Ordinance: Rights of Landlords & Tenants",
    excerpt:
      "Rent agreements, rent controllers, evictions and deposits in Karachi explained under the Sindh Rented Premises Ordinance.",
    author: "Fatima Rizvi, Associate",
    tags: ["Rent", "Tenant", "Landlord", "Sindh"],
    reading_time: 5,
    published_at: new Date(Date.now() - 14 * 86_400_000).toISOString(),
    content_md: `The **Sindh Rented Premises Ordinance, 1979** governs most residential and commercial tenancies in Karachi, enforced through the office of the Rent Controller.

## Written tenancy agreement is mandatory

Every tenancy must be recorded in writing and submitted to the Rent Controller within seven days. An unregistered agreement weakens both parties' positions.

## Landlord rights

- Fair market rent revisions as permitted by the Ordinance
- Eviction on statutory grounds: non-payment, subletting without consent, structural damage, personal requirement
- Recovery of arrears through a rent eviction petition rather than self-help measures

## Tenant rights

- Protection from eviction except on statutory grounds
- Receipts for every rent payment
- Reasonable notice before landlord inspection

## The eviction process

A petition is filed before the **Rent Controller (Karachi East/West/South/Central/Malir)** having territorial jurisdiction. After service and evidence, the Controller decides within prescribed timelines. Appeals lie to the Sindh High Court on questions of law.

## Practical tips for Karachi landlords

1. Never collect more than one month's advance plus refundable security unless agreed in writing.
2. Keep CNIC copies of every occupant.
3. Issue monthly receipts — courts treat undocumented cash rents harshly.

Our chamber regularly represents landlords and tenants before Rent Controllers across Karachi City Courts.`,
  },
  {
    id: "seed-succession-certificate",
    slug: "how-to-obtain-succession-certificate-sindh",
    title: "How to Obtain a Succession Certificate in Sindh",
    excerpt:
      "Documents, procedure and timeline for obtaining a succession certificate from the District Court for movable assets of a deceased person in Pakistan.",
    author: "Ahmed Rizvi, Advocate High Court",
    tags: ["Succession", "Family Law", "Inheritance"],
    reading_time: 4,
    published_at: new Date(Date.now() - 7 * 86_400_000).toISOString(),
    content_md: `When a person dies leaving bank accounts, shares, prize bonds or other **movable assets**, the legal heirs need a **succession certificate** issued by the civil/family judge with jurisdiction over where the deceased ordinarily resided.

## Step 1 — Gather core documents

- Death certificate from NADRA / union council
- CNICs of all legal heirs
- Family registration certificate (NADRA FRC)
- Asset details: account numbers, share folios, bond serials

## Step 2 — File the petition

A petition under the **Succession Act, 1925** is filed in the District Courts at Karachi (City Courts) or Malir, depending on residence. Public notice is issued in newspapers inviting objections.

## Step 3 — Contested vs uncontested

Most certificates are granted uncontested within roughly **6–10 weeks** once the notice period expires. If a relative objects, the matter proceeds as a suit with evidence — this is where experienced counsel matters.

## Step 4 — Bond and issuance

Heirs furnish a surety bond equal to the asset value, after which certified copies are provided to each bank/institution.

> Note: immovable property does **not** pass via succession certificate — heirs use inheritance mutations (intiqal) and, where needed, declaration suits instead.

We handle the entire process on a transparent, milestone-based fee schedule in PKR.`,
  },
];
