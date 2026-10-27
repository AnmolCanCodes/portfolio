import type { ComponentType } from "react";
import { Network, Search, Radio, Sparkles, MousePointerClick } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiLangchain,
  SiNodedotjs,
  SiTailwindcss,
  SiGithub,
  SiFastapi,
  SiRedis,
  SiPython,
  SiKotlin,
  SiAndroid,
  SiJetpackcompose,
  SiEclipsemosquitto,
  SiSupabase,
  SiDatabricks,
  SiPostgresql,
  SiDocker,
  SiGrafana,
  SiPrometheus,
  SiScikitlearn,
  SiQdrant,
  SiGooglechrome,
  SiGradle,
  SiJunit5,
} from "react-icons/si";

export type TechIcon = ComponentType<{ className?: string }>;
export type TechKey =
  | "next" | "ts" | "react" | "three" | "langchain" | "langgraph" | "rag"
  | "node" | "tailwind" | "github" | "fastapi" | "redis" | "python"
  | "kotlin" | "android" | "compose" | "mqtt" | "supabase" | "databricks"
  | "postgres" | "docker" | "grafana" | "prometheus" | "sklearn" | "qdrant"
  | "chrome" | "gradle" | "junit" | "playwright" | "websockets" | "llm";

export type TechItem = TechKey | { label: string; tooltip?: string; };

export type ProjectStatus = "live" | "building" | "research" | "archived";

export interface Project {
  slug: string;
  title: string;
  imageTitle: string;
  src: string;
  lightModeSrc?: string;
  description: string;
  tech: TechItem[];
  github: string;
  /** Omit when there is nothing working to link to. */
  live?: string;
  status: ProjectStatus;
  starsText?: string;
  backgroundImage?: string;
  hasPin: boolean;
}

export const iconMap: Record<TechKey, TechIcon> = {
  next: SiNextdotjs, ts: SiTypescript, react: SiReact, three: SiThreedotjs,
  langchain: SiLangchain, langgraph: Network, rag: Search, node: SiNodedotjs,
  tailwind: SiTailwindcss, github: SiGithub, fastapi: SiFastapi, redis: SiRedis,
  python: SiPython, kotlin: SiKotlin, android: SiAndroid, compose: SiJetpackcompose,
  mqtt: SiEclipsemosquitto, supabase: SiSupabase, databricks: SiDatabricks,
  postgres: SiPostgresql, docker: SiDocker, grafana: SiGrafana, prometheus: SiPrometheus,
  sklearn: SiScikitlearn, qdrant: SiQdrant, chrome: SiGooglechrome, gradle: SiGradle,
  junit: SiJunit5, playwright: MousePointerClick, websockets: Radio, llm: Sparkles,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", three: "Three.js",
  langchain: "LangChain", langgraph: "LangGraph", rag: "RAG", node: "Node.js",
  tailwind: "Tailwind CSS", github: "GitHub API", fastapi: "FastAPI", redis: "Redis",
  python: "Python", kotlin: "Kotlin", android: "Android", compose: "Jetpack Compose",
  mqtt: "MQTT", supabase: "Supabase", databricks: "Databricks", postgres: "PostgreSQL",
  docker: "Docker", grafana: "Grafana", prometheus: "Prometheus", sklearn: "scikit-learn",
  qdrant: "Qdrant", chrome: "Chrome Extension", gradle: "Gradle", junit: "JUnit",
  playwright: "Playwright", websockets: "WebSockets", llm: "LLM",
};

export const projectsData: Project[] = [
  {
    slug: "pricezen",
    title: "PriceZen AI",
    imageTitle: "PriceZen",
    src: "/project-image/Ppricezen-ui.png",
    description: "An autonomous agent that explores a running web app, decides what to do next from live runtime behaviour, and reports what broke — with no pre-written test scripts.",
    tech: ["next", "fastapi", "playwright", "postgres", "fastapi", "selenium"],
    github: "https://github.com/AnmolCanCodes/pricezen-frontend",
    live: "",
    status: "live",
    backgroundImage: "/project-hover-pricezen.webp",
    hasPin: true,
  },
  {
    slug: "ai",
    title: "AI-Repo Intelligence Agent",
    imageTitle: "AI-Repo Intelligence Agent",
    src: "/project-image/ai-repo-intelligence-agent.png",
    description: "An AI-powered codebase assistant that enables developers to connect a GitHub repository and ask questions about the codebase using natural language",
    tech: ["ts", "fastapi", "github", "langgraph", "llm"],
    github: "https://github.com/AnmolCanCodes/AI-Repo-Intelligence-Agent.",
    status: "live",
    backgroundImage: "/project-hover-ai-repo-intelligence.webp",
    hasPin: true,
  },
  {
    slug: "ai-customer-support-copilot",
    title: "AI customer Support Copilot",
    imageTitle: "AI customer Support Copilot",
    src: "/project-image/ai-customer-support-copilot.png",
    description: "A professional RAG-based customer support assistant that enables users to upload their own PDF/TXT documents and ask questions based exclusively on those uploaded files.",
    tech: ["next", "ts", "python", "rag", "langchain", "fastapi"],
    github: "https://github.com/AnmolCanCodes/AI-Customer-Support-Copilot",
    live: "https://ai-customer-support-copilot-silk.vercel.app/",
    status: "live",
    backgroundImage: "/project-hover-ai-support-copilot.webp",
    hasPin: true,
  },
  
];
