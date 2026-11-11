import { SITE_URL } from "@/lib/site";
import { portfolio } from "~/portfolio.config";

export function PersonJsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.name,
    url: SITE_URL,
    jobTitle: "AI Backend Developer",
    sameAs: [
      `https://github.com/${portfolio.handles.github}`,
      `https://www.linkedin.com/in/${portfolio.handles.linkedin}/`,
      `https://x.com/${portfolio.handles.x}`,
    ],
    knowsAbout: [
      "RAG systems",
      "Agentic workflows",
      "FastAPI backends",
      "Python backend engineering",
      "Generative AI",
      "AI product engineering",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema),
      }}
    />
  );
}
