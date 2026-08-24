export const SITE = {
  name: "Rizvi Law Associates",
  shortName: "RLA",
  tagline: "Advocates & Legal Consultants",
  credential:
    "High Court of Sindh & Karachi City Courts",
  leadAdvocate: "Muhammad Ahmed Rizvi",
  leadAdvocateTitle: "Founder & Principal — Advocate High Court",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  addressLines: [
    "Suite #402, 4th Floor, Executive Towers",
    "Block 5, Clifton, Karachi, Sindh, Pakistan",
  ],
  addressShort: "Executive Towers, Clifton, Karachi",
  phoneDisplay: "+92 21 3583 1234",
  phoneHref: "tel:+922135831234",
  whatsappDisplay: "+92 300 1234567",
  whatsappHref:
    "https://wa.me/923001234567?text=" +
    encodeURIComponent(
      "Assalam-o-Alaikum, I would like to book a confidential legal consultation."
    ),
  email: "info@rizvilawassociates.pk",
  emailHref: "mailto:info@rizvilawassociates.pk",
  hours: "Mon – Sat: 9:00 AM – 7:00 PM PKT",
  hoursDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  hoursTime: "9:00 AM – 7:00 PM (PKT)",
  consultationFeePKR: 5000,
  consultationFeeLabel: "Rs. 5,000 · 30-minute consultation",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Practice Areas" },
  { href: "/insights", label: "Legal Insights" },
  { href: "/contact", label: "Contact" },
] as const;

/** Half-hourly appointment slots between office opening and one hour before close. */
export const TIME_SLOTS = [
  { value: "09:00", label: "09:00 AM – 10:00 AM" },
  { value: "10:00", label: "10:00 AM – 11:00 AM" },
  { value: "11:00", label: "11:00 AM – 12:00 PM" },
  { value: "12:00", label: "12:00 PM – 01:00 PM" },
  { value: "14:00", label: "02:00 PM – 03:00 PM" },
  { value: "15:00", label: "03:00 PM – 04:00 PM" },
  { value: "16:00", label: "04:00 PM – 05:00 PM" },
  { value: "17:00", label: "05:00 PM – 06:00 PM" },
  { value: "18:00", label: "06:00 PM – 07:00 PM" },
] as const;

export type TimeSlotValue = (typeof TIME_SLOTS)[number]["value"];

export const CASE_CATEGORIES = [
  { value: "corporate_commercial", label: "Corporate & Commercial Litigation" },
  { value: "property_real_estate", label: "Property & Real Estate" },
  { value: "family_law", label: "Family Law (Khula / Divorce / Custody)" },
  { value: "criminal_bail", label: "Criminal Defense & Bail" },
  { value: "tax_customs", label: "Tax & Customs (FBR / SRB)" },
  { value: "cyber_crime_peca", label: "Cyber Crime (PECA)" },
  { value: "other", label: "Other / Not Sure" },
] as const;

export const TRUST_BADGES = [
  {
    title: "Sindh Bar Council",
    caption: "Enrolled Advocate",
  },
  {
    title: "Karachi Bar Association",
    caption: "Active Member",
  },
  {
    title: "High Court Bar Association",
    caption: "Karachi — Member",
  },
  {
    title: "Supreme Court of Pakistan",
    caption: "Appellate Practice",
  },
] as const;

/** Window event name used to open the AI chat widget from anywhere. */
export const CHAT_OPEN_EVENT = "klaw:open-chat";

export const STATS = [
  { value: 500, suffix: "+", label: "Cases Resolved" },
  { value: 98, suffix: "%", label: "Success Rate" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 800, suffix: "+", label: "Clients Advised" },
] as const;
