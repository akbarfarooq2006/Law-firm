import {
  Building2,
  Gavel,
  Landmark,
  Receipt,
  ShieldAlert,
  Users,
} from "lucide-react";
import type { PracticeArea } from "@/types";

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "corporate-commercial-litigation",
    title: "Corporate & Commercial Litigation",
    icon: Landmark,
    tagline: "SECP, contracts & commercial disputes",
    description:
      "End-to-end representation for companies operating in Karachi — from SECP compliance and contract vetting to recovery suits and banking court litigation.",
    overview: [
      "Karachi is Pakistan's commercial capital, and commercial friction here moves fast. Our chamber advises private limited companies, partnerships and trading houses on preventive compliance — so disputes are less likely — and represents clients decisively when they arise.",
      "We appear before the High Court of Sindh (including its company and banking benches), the Banking Courts Karachi, and in arbitration and mediation forums. Retainers are documented in writing with clear PKR fee schedules.",
    ],
    offerings: [
      {
        title: "SECP & Corporate Compliance",
        description:
          "Incorporation, statutory returns, director disputes, oppression & mismanagement petitions.",
      },
      {
        title: "Contract Drafting & Vetting",
        description:
          "Supply, distribution, JV, employment and franchise agreements tailored to Pakistani law.",
      },
      {
        title: "Recovery Suits",
        description:
          "Money decrees, cheque dishonour (Negotiable Instruments Act) and summary suits under the CPC.",
      },
      {
        title: "Banking & Finance Litigation",
        description:
          "Banking Court matters: loan defaults, mortgage enforcement and financial crime defense.",
      },
      {
        title: "Arbitration & ADR",
        description:
          "Enforcement of arbitral awards and negotiated settlements that protect business relationships.",
      },
      {
        title: "Labour & Employment",
        description:
          "NIRC references, termination disputes and workplace misconduct inquiries.",
      },
    ],
    urduTerms: [
      { term: "Iqrarnama", meaning: "Written agreement / deed of settlement between parties." },
      { term: "Dawa-e-Wasuli", meaning: "Recovery suit for unpaid dues." },
    ],
    venues: ["High Court of Sindh", "Banking Courts Karachi", "SECP", "NIRC"],
    faqs: [
      {
        question: "How long does a commercial recovery suit take in Karachi?",
        answer:
          "Summary suits under Order XXXVII CPC can conclude in 12–24 months at trial-court pace; negotiated settlements often resolve within weeks. We give you a realistic timeline after reviewing your documents.",
      },
      {
        question: "Do you offer monthly retainers for companies?",
        answer:
          "Yes. Retainers start from Rs. 75,000/month covering advisory calls, contract vetting and notices, with litigation billed separately on a written schedule.",
      },
      {
        question: "Can you register a new company with the SECP?",
        answer:
          "Absolutely — name reservation, incorporation documents, NTN/STRN registration and post-incorporation compliance are handled end-to-end, typically within 5–7 working days.",
      },
      {
        question: "What should I bring to the first consultation?",
        answer:
          "The disputed contract or agreement, invoices/receipts, any correspondence (emails, legal notices), and company registration documents if available.",
      },
    ],
  },
  {
    slug: "property-real-estate-law",
    title: "Property & Real Estate Law",
    icon: Building2,
    tagline: "Title verification, KDA/SBCA & land disputes",
    description:
      "Buy and build with confidence. Title verification for DHA, Clifton/Cantonment, KDA, LDA-style schemes, SBCA approvals, Bahria Town files, registry transfers and land dispute litigation.",
    overview: [
      "Property fraud remains Karachi's most expensive legal risk. Every engagement starts with forensic verification of title — Sub-Registrar certified copies, revenue records (fard / intiqal), SBCA plan approvals and encumbrance searches across courts and banks.",
      "When disputes do occur, we litigate possession claims, specific performance of agreements to sell, inheritance partitions and cancellation of fraudulent registries before the High Court of Sindh and City Courts Karachi.",
    ],
    offerings: [
      {
        title: "Property Title Verification",
        description:
          "13-point due-diligence report covering chain of title, mutations, taxes, mortgages and litigation status — delivered in 3–5 working days.",
      },
      {
        title: "Registry & Transfer Execution",
        description:
          "Drafting and registration of sale deeds, gift deeds and Wakala Namas before Karachi Sub-Registrars.",
      },
      {
        title: "SBCA & Builder Matters",
        description:
          "Plan approvals, regularization, builder-defect claims and handover/possession disputes for apartments.",
      },
      {
        title: "Land Dispute Litigation",
        description:
          "Possession suits, specific performance, partition of inherited land and cancellation of forged documents.",
      },
      {
        title: "Housing Society Issues",
        description:
          "Bahria Town, DHA, KDA and cooperative society allotments, transfers and membership disputes.",
      },
      {
        title: "Landlord & Tenant",
        description:
          "Rent agreements and eviction petitions before Rent Controllers under the Sindh Rented Premises Ordinance.",
      },
    ],
    urduTerms: [
      { term: "Fard-e-Malkiat", meaning: "Official revenue record showing ownership of land." },
      { term: "Intiqal", meaning: "Mutation — revenue entry recording transfer of title." },
      { term: "Bayana", meaning: "Earnest money paid on agreement to purchase property." },
    ],
    venues: [
      "High Court of Sindh",
      "City Courts Karachi",
      "Malir Courts",
      "Sub-Registrar Offices",
      "SBCA",
    ],
    faqs: [
      {
        question: "What documents do I need for property transfer in Karachi?",
        answer:
          "Typically: original registered deed/allotment-cum-transfer letter, latest tax challans, seller's CNIC, approved building plan (if constructed), NOCs where applicable, and a lawyer-drafted sale deed executed before the Sub-Registrar with two witnesses.",
      },
      {
        question: "How long does title verification take?",
        answer:
          "Our standard written verification report takes 3–5 working days; complex agricultural or disputed parcels may take up to two weeks including court searches.",
      },
      {
        question: "Is an unregistered agreement to sell valid?",
        answer:
          "It can evidence intent but does not convey title. Only a registered conveyance before the Sub-Registrar transfers ownership. Courts can, however, enforce specific performance of written agreements.",
      },
      {
        question: "Can I buy Bahria Town file-based property safely?",
        answer:
          "File-based purchases carry additional risk (allotment vs. actual plot). We verify allotment letters, transfer records with the society and any injunctions before advising on price and payment milestones.",
      },
    ],
  },
  {
    slug: "family-law",
    title: "Family Law",
    icon: Users,
    tagline: "Khula, divorce, custody & succession",
    description:
      "Compassionate, confidential handling of Khula/Kula, divorce, child custody, maintenance and succession certificates before Karachi Family Courts.",
    overview: [
      "Family matters demand both legal precision and human sensitivity. We guide clients through Nikahnama review, Khula and divorce proceedings, child custody (hizanat), guardianship and maintenance claims with strict confidentiality.",
      "Our chamber also secures succession certificates and letters of administration under the Succession Act 1925, so families can access bank accounts, shares and other movable assets of deceased relatives without avoidable delay.",
    ],
    offerings: [
      {
        title: "Khula & Divorce",
        description:
          "Court decrees of Khula, Talaq procedure and registration, and protection against frivolous proceedings.",
      },
      {
        title: "Child Custody & Guardianship",
        description:
          "Custody, visitation access and guardianship petitions focused on the child's welfare.",
      },
      {
        title: "Maintenance Claims",
        description:
          "Wife and children's maintenance under the Muslim Family Laws Ordinance and West Pakistan rules.",
      },
      {
        title: "Succession Certificates",
        description:
          "Uncontested certificates typically granted in 6–10 weeks; contested estate litigation also undertaken.",
      },
      {
        title: "Dowry & Haq Mehr",
        description:
          "Recovery of dower articles and haq mehr through Family Courts.",
      },
      {
        title: "Nikahnama Drafting",
        description:
          "Pre-marital advisory and drafting that protects delegated divorce rights and dower terms.",
      },
    ],
    urduTerms: [
      { term: "Khula / Kula", meaning: "Judicial dissolution of marriage at the wife's instance." },
      { term: "Haq Mehr", meaning: "Obligatory dower payable by the husband under the Nikahnama." },
      { term: "Wakala", meaning: "Power of attorney authorizing an agent to act for a principal." },
    ],
    venues: ["Family Courts Karachi", "City Courts Karachi", "Malir Courts", "High Court of Sindh"],
    faqs: [
      {
        question: "How long does a Khula case take in Karachi?",
        answer:
          "Uncontested Khula decrees are commonly granted within 2–4 months; reconciliation attempts mandated by the court can extend timelines slightly.",
      },
      {
        question: "Who gets child custody?",
        answer:
          "Courts decide solely on the child's welfare. Young children usually remain with the mother (hizanat), while fathers are natural guardians for property matters. Visitation rights are structured for the non-custodial parent.",
      },
      {
        question: "What documents are needed for a succession certificate?",
        answer:
          "Death certificate, NADRA FRC listing all heirs, heirs' CNICs and details of the assets (bank accounts, shares, bonds). We prepare and file the petition and publish the required public notice.",
      },
      {
        question: "Are family proceedings confidential?",
        answer:
          "Yes — Family Court records are not open to the general public, and our chamber enforces absolute client confidentiality beyond what law requires.",
      },
    ],
  },
  {
    slug: "criminal-defense-bail",
    title: "Criminal Defense & Bail",
    icon: Gavel,
    tagline: "Bail, trials & FIR quashment",
    description:
      "Urgent pre-arrest and post-arrest bail, FIR quashment before the Sindh High Court, and full trial defense before City Courts and Malir Courts Karachi.",
    overview: [
      "Liberty cannot wait. Our criminal desk operates on priority response — bail applications drafted the same day where facts allow, with round-the-clock counsel availability during arrests.",
      "From 22-A/22-B quashment petitions and anticipatory bail to full trials and SHC appeals, we build defenses grounded in forensic gaps, procedural violations and constitutional protections.",
    ],
    offerings: [
      {
        title: "Pre-Arrest & Post-Arrest Bail",
        description:
          "Emergency applications before Sessions Courts and the High Court of Sindh, including weekend filing.",
      },
      {
        title: "FIR Quashment (22-A / 22-B)",
        description:
          "Ex-facie innocent clients protected through Justice of Peace proceedings and SHC Constitutional petitions.",
      },
      {
        title: "Trial Defense",
        description:
          "Cross-examination strategy, defence witnesses and expert evidence before Sessions & Magistrate courts.",
      },
      {
        title: "White-Collar Crime",
        description:
          "Defense in NAB references, banking offenses, cheque dishonour and anti-corruption proceedings.",
      },
      {
        title: "Appeals & Revisions",
        description:
          "Conviction appeals, suspension of sentences and revisions before the High Court of Sindh.",
      },
      {
        title: "Police Station Representation",
        description:
          "Immediate presence during interrogation to prevent custodial excesses and unlawful detention.",
      },
    ],
    urduTerms: [
      { term: "Zamanat", meaning: "Bail — conditional release from custody pending trial." },
      { term: "FIR", meaning: "First Information Report registering a criminal complaint." },
    ],
    venues: ["High Court of Sindh", "City Courts Karachi", "Malir Courts", "Anti-Terrorism Courts"],
    faqs: [
      {
        question: "How quickly can bail be arranged?",
        answer:
          "For bailable offenses, release orders can be secured within hours of engagement. Bailable-warrant and 497/498 CrPC matters depend on the court roster; we file same-day wherever the roster allows.",
      },
      {
        question: "An FIR has been lodged falsely — can it be cancelled?",
        answer:
          "Yes. Under Sections 22-A/22-B CrPC a Justice of Peace can order registration/disposal issues, and the Sindh High Court can quash FIRs that are manifestly mala fide. Timelines run from weeks to a few months.",
      },
      {
        question: "Do you attend police stations directly?",
        answer:
          "Yes — counsel presence during interrogation is part of our urgent-response service and often prevents escalation to arrest.",
      },
      {
        question: "What does emergency criminal defense cost?",
        answer:
          "Bail engagements start from Rs. 50,000 per instance depending on forum and offense grade, confirmed in writing before we file anything.",
      },
    ],
  },
  {
    slug: "tax-customs-law",
    title: "Tax & Customs Law",
    icon: Receipt,
    tagline: "FBR, SRB disputes & appeals",
    description:
      "Income tax, sales tax, SRB services-tax and customs disputes — audits, adjudication, Appellate Tribunal appearances and High Court references.",
    overview: [
      "Revenue authorities increasingly rely on automated notices and provisional assessments. We respond to FBR audits, sales-tax registrations issues and SRB enforcement with documented, statute-grounded replies that keep penalties minimal.",
      "Where assessment goes wrong, we escalate methodically: Commissioner (Appeals), Appellate Tribunal Inland Revenue / Customs Appellate Tribunal, References before the High Court of Sindh and onward to the Supreme Court.",
    ],
    offerings: [
      {
        title: "FBR Notices & Audits",
        description:
          "Replies to 122(5A)/122(9) notices, audit objections and best-judgment assessments.",
      },
      {
        title: "Sales Tax & Withholding",
        description:
          "Registration issues, input/output tax disputes and withholding reconciliations.",
      },
      {
        title: "SRB Services Tax",
        description:
          "Sindh Revenue Board registrations, classifications and recovery proceedings defense.",
      },
      {
        title: "Customs & Imports",
        description:
          "Valuation disputes, classification rulings, confiscation cases and customs adjudication.",
      },
      {
        title: "Tribunal Appeals",
        description:
          "ATIR and Customs Appellate Tribunal appearances with complete paper-book preparation.",
      },
      {
        title: "Tax Planning Advisory",
        description:
          "Lawful structuring for businesses and overseas Pakistanis holding Karachi assets.",
      },
    ],
    urduTerms: [{ term: "Maliya Wajib-ul-Ada", meaning: "Tax liability assessed against a person." }],
    venues: ["FBR / ATIR", "Sindh Revenue Board", "Customs Adjudication", "High Court of Sindh"],
    faqs: [
      {
        question: "I received an FBR notice — what is my deadline?",
        answer:
          "Most notices specify 7–15 days. Contact us immediately; a well-drafted reply within time almost always narrows the dispute and prevents ex-parte assessment.",
      },
      {
        question: "Can tax appeals be filed online?",
        answer:
          "Iris-based e-filing covers several steps, but tribunal filings require physical paper-books and personal appearance — both handled by our team.",
      },
      {
        question: "Do overseas Pakistanis need a local representative?",
        answer:
          "Yes, practical handling of Karachi property tax, filer status and FBR correspondence is done via Wakala (power of attorney) which we draft and register.",
      },
      {
        question: "What are typical fees?",
        answer:
          "Notice replies from Rs. 25,000; tribunal appeals quoted after reviewing the assessment order, always as a fixed written estimate.",
      },
    ],
  },
  {
    slug: "cyber-crime-peca",
    title: "Cyber Crime & PECA",
    icon: ShieldAlert,
    tagline: "PECA complaints, FIA & online defamation",
    description:
      "Cyber harassment, online defamation, data theft and electronic evidence under PECA 2016 — complaints, investigations and defense before FIA Cybercrime Wing and Special Courts.",
    overview: [
      "Digital wrongdoing needs digital literacy from your advocate. We handle PECA matters involving social-media harassment, impersonation, WhatsApp blackmail, financial fraud and unauthorized data access — both prosecuting complaints and defending the accused.",
      "Electronic evidence lives or dies on proper collection under Article 2(k) Qanun-e-Shahadat. We preserve, certify and present digital records so they survive scrutiny in Special Courts (PECA) and beyond.",
    ],
    offerings: [
      {
        title: "Cyber Harassment Complaints",
        description:
          "Complaints to FIA Cybercrime Wing and deoxyribonucleic-fast interim relief for victims.",
      },
      {
        title: "Online Defamation",
        description:
          "Civil damages and criminal remedies for viral false posts targeting individuals or brands.",
      },
      {
        title: "Financial Cyber Fraud",
        description:
          "Tracing and freezing proceeds of online scams, card fraud and unauthorized transfers.",
      },
      {
        title: "Data Theft & Hacking",
        description:
          "Unauthorized access, employee data-exfiltration and trade-secret protection actions.",
      },
      {
        title: "PECA Defense",
        description:
          "Bail and trial defense in Section 20/21/24 matters before Special Courts Karachi.",
      },
      {
        title: "Content Removal",
        description:
          "Notices to platforms and PTA coordination for takedown of unlawful content.",
      },
    ],
    urduTerms: [{ term: "Ittila", meaning: "Complaint/information lodged with authorities." }],
    venues: ["FIA Cybercrime Wing", "Special Court (PECA)", "High Court of Sindh", "PTA"],
    faqs: [
      {
        question: "Where do I report cyber harassment in Karachi?",
        answer:
          "At the FIA Cybercrime Wing (National Cybercrime Investigation Agency) regional office or via their online complaint portal. We prepare the complaint bundle — printouts, hash values, affidavits — so it is admissible on first attempt.",
      },
      {
        question: "Can deleted WhatsApp messages be used as evidence?",
        answer:
          "Often yes, through device forensics, chat exports with certification and recipient-side copies collected under legal supervision.",
      },
      {
        question: "Is posting criticism of someone a PECA offense?",
        answer:
          "Fair criticism is protected; false imputation harming reputation can attract Sections 20 (dignity) and 21 (modesty-related) PECA. Context and truth are decisive — get advice before posting or responding.",
      },
      {
        question: "How fast can content be removed?",
        answer:
          "Platform takedowns range from days to weeks; PTA blocking routes exist for clearly unlawful content. We pursue parallel civil remedies where delay harms our client.",
      },
    ],
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return PRACTICE_AREAS.find((p) => p.slug === slug);
}
