export interface Testimonial {
  name: string;
  location: string;
  caseType: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Farhan Siddiqui",
    location: "DHA Phase 6, Karachi",
    caseType: "Property Title Verification",
    quote:
      "Mr. Rizvi's verification report saved me from buying a plot with two competing claims on it. The due diligence was forensic — Sub-Registrar copies, revenue records, everything documented within four days.",
    rating: 5,
  },
  {
    name: "Ayesha Kamal",
    location: "Gulshan-e-Iqbal, Karachi",
    caseType: "Khula & Custody",
    quote:
      "Going through Khula felt impossible from abroad. The team handled my Family Court case with dignity and total confidentiality, and I video-called into every hearing update. My daughter's custody is settled now.",
    rating: 5,
  },
  {
    name: "Bilal Chaudhry",
    location: "I.I. Chundrigar Road",
    caseType: "Commercial Recovery Suit",
    quote:
      "A distributor owed our company Rs. 18 million for over a year. Their legal notice alone recovered half; the summary suit secured the rest. Written fee schedule, no surprises.",
    rating: 5,
  },
  {
    name: "Sana Qureshi",
    location: "North Nazimabad, Karachi",
    caseType: "Succession Certificate",
    quote:
      "After my father's passing we couldn't access his bank accounts. They obtained the succession certificate from the City Courts in under nine weeks and dealt with every bank ourselves.",
    rating: 5,
  },
  {
    name: "Imran Baig",
    location: "PECHS Block 2, Karachi",
    caseType: "Criminal Bail (497 CrPC)",
    quote:
      "When my brother was arrested late Friday night, their counsel was at Malir Courts by Saturday morning. Bail was granted on the first listing. I cannot overstate that responsiveness.",
    rating: 5,
  },
  {
    name: "Zainab & Omar Hasan",
    location: "Clifton Block 8, Karachi",
    caseType: "Apartment Purchase — SBCA",
    quote:
      "They caught an unapproved floor plan during our apartment purchase in Clifton and negotiated rectification before transfer. Professional, precise, and genuinely protective of us as buyers.",
    rating: 5,
  },
];
