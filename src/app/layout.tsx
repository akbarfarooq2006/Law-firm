import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { Toaster } from "sonner";
import "./globals.css";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Advocates & Legal Consultants, Karachi`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Advocate High Court with 15+ years of experience in Karachi. Property verification (KDA/SBCA/Bahria), family & Khula law, criminal bail, corporate litigation, FBR tax and PECA cyber matters. Clifton chamber — Mon–Sat 9 AM–7 PM PKT.",
  keywords: [
    "advocate Karachi",
    "law firm Clifton Karachi",
    "property verification Karachi",
    "Khula lawyer Karachi",
    "bail lawyer Sindh High Court",
    "succession certificate Pakistan",
    "PECA cyber crime advocate",
    "FBR tax lawyer Karachi",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: SITE.name,
    title: `${SITE.name} — Advocates & Legal Consultants, Karachi`,
    description:
      "Ethical advocacy across the High Court of Sindh, City Courts Karachi & Malir Courts. Book a confidential consultation.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1828",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <Toaster position="bottom-left" richColors closeButton />
      </body>
    </html>
  );
}
