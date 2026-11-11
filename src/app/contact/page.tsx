import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Anmol Gupta about AI backend engineering, RAG systems, and product work.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Anmol Gupta",
    description: "Connect with Anmol Gupta about AI backend engineering, RAG systems, and product work.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
