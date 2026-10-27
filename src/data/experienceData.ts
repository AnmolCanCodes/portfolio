export type ExperienceData = {
  title: string;
  role: string;
  dates: string;
  location: string;
  src: string;
  type?: string;
  imageFit?: "contain" | "cover";
  /** Logos that are their own coloured tile bleed to the edge instead of sitting inset on white. */
  imageBleed?: boolean;
  imageZoom?: number;
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  screenshot?: string;
};

export const experiences: ExperienceData[] = [
  {
    title: "Indie Full stack AI engineer",
    role: "Full stack AI engineer",
    dates: "March 2026 - Present",
    location: "Uttar Pradesh, India",
    src: "/experience/indie-fs.png",
    type: "Remote",
    imageFit: "cover",
    imageBleed: true,
    imageZoom: 1,
    description: `
      Full-stack AI engineer building end-to-end software, with a focus on backend engineering, Generative AI, and agentic systems
    `,
    tech: [
      "TypeScript",
      "Python",
      "FastAPI",
      "Database",
      "AI/ML",
    ],
  },
];
