import type { Metadata } from "next";
import AllProjectsPage from "@/components/AllProjectsPage";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected AI backend, RAG, and agent system projects built by Anmol Gupta.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Anmol Gupta",
    description: "Selected AI backend, RAG, and agent system projects built by Anmol Gupta.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return <AllProjectsPage />;
}
