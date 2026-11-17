import type { Metadata } from "next";
import AllExperiencePage from "@/components/AllExperiencePage";

export const metadata: Metadata = {
  title: "Experience",
  description: "Career timeline covering AI backend engineering, RAG systems, and product engineering work by Anmol Gupta.",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Experience | Anmol Gupta",
    description: "Career timeline covering AI backend engineering, RAG systems, and product engineering work by Anmol Gupta.",
    url: "/experience",
  },
};

export default function ExperiencePage() {
  return <AllExperiencePage />;
}
