export type Hackathon = {
  id: string;
  event: string;
  organizer: string;
  placement: string;
  scale: string;
  dates: string;
  project: string;
  problem: string;
  built: string[];
  principle?: string;
  team?: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  links?: { label: string; href: string }[];
};

export const hackathonsData: Hackathon[] = [
  {
    id: "databricks-hackathon",
    event: "Databricks Hackathon",
    organizer: "HackCulture x Databricks, with BMSCE and RVCE, at Bengaluru Tech Week",
    placement: "Finalist",
    scale: "700+ teams",
    dates: "2026",
    project: "CampusQuest",
    problem:
      "Opportunities are everywhere - a hackathon here, a course there, an internship opening. Working out which one makes sense for you right now is the hard part.",
    built: [
      "Time Machine - click a skill you do not have yet and watch your role alignment change, along with the jobs that just opened up.",
      "Gap-based people matching - if you already do frontend you do not need another frontend dev, so we matched on what is missing rather than what is the same.",
      "Ask Genie - Databricks' chatbot over our campus data: ask in plain English, get the answer plus the SQL behind it.",
    ],
    principle:
      "If a number shows up in the app, an LLM did not make it. Genie writes the explanation, never the number.",
    team: ["Abhinav Kumar Singh", "Shivansh Bhageria", "Kartikeya Gupta"],
    tech: ["Next.js", "Supabase", "Databricks", "Genie", "TypeScript"],
    metrics: [
      { label: "Teams", value: "700+" },
      { label: "Placement", value: "Top 10" },
      { label: "Rounds", value: "3" },
      { label: "Team Size", value: "4" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/Paras-ydv/CampusQuest" },
    ],
  },
  {
    id: "sih-2025",
    event: "Smart India Hackathon 2025",
    organizer: "Ministry of Education, Government of India",
    placement: "Finalist",
    scale: "200+ teams nationwide",
    dates: "2025",
    project: "NBCFDC credit-risk model",
    problem:
      "Rural borrowers under the National Backward Classes Finance and Development Corporation are hard to credit-score, because their income is largely informal and undocumented.",
    built: [
      "A credit-risk model with income verification built for rural populations, where salary-slip and bureau signals are mostly absent.",
    ],
    tech: ["Python", "Machine Learning", "Feature Engineering"],
    metrics: [
      { label: "Teams", value: "200+" },
      { label: "Placement", value: "Top 5" },
      { label: "Level", value: "National" },
      { label: "Year", value: "2025" },
    ],
  },
];
