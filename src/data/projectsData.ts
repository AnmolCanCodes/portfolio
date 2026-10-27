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
  selenium: MousePointerClick, langchainhub: SiLangchain, langchainhubagent: SiLangchain,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", three: "Three.js",
  langchain: "LangChain", langgraph: "LangGraph", rag: "RAG", node: "Node.js",
  tailwind: "Tailwind CSS", github: "GitHub API", fastapi: "FastAPI", redis: "Redis",
  python: "Python", kotlin: "Kotlin", android: "Android", compose: "Jetpack Compose",
  mqtt: "MQTT", supabase: "Supabase", databricks: "Databricks", postgres: "PostgreSQL",
  docker: "Docker", grafana: "Grafana", prometheus: "Prometheus", sklearn: "scikit-learn",
  qdrant: "Qdrant", chrome: "Chrome Extension", gradle: "Gradle", junit: "JUnit",
  playwright: "Playwright", websockets: "WebSockets", llm: "LLM", selenium: "Selenium", langchainhub: "LangChain Hub", langchainhubagent: "LangChain Hub Agent",
};

export const projectsData: Project[] = [
  {
    slug: "pricezen",
    title: "PriceZen",
    imageTitle: "Price Intelligence",
    src: "/pricezen.png",
    description: "PriceZen is a competitor price intelligence platform for e-commerce brands. It helps businesses track market pricing, identify revenue risks, and act on clear recommendations before customers switch to a cheaper alternative.",
    tech: ["next", "ts", "python", "fastapi", "postgres"],
    github: "https://github.com/AnmolCanCodes/pricezen-frontend",
    live: "https://pricezen.in",
    status: "live",
    backgroundImage: "/project-hover-pricezen.webp",
    hasPin: true,
  },
  {
    slug: "ai-support-copilot",
    title: "AI Support Copilot",
    imageTitle: "RAG Assistant",
    src: "/ai-support-copilot.png",
    description: "A professional RAG-based customer support assistant that enables users to upload their own PDF/TXT documents and ask questions based exclusively on those uploaded files.",
    tech: ["next", "ts", "python", "langchain", "rag", "llm", "fastapi"],
    github: "https://github.com/AnmolCanCodes/AI-Customer-Support-Copilot",
    live: "https://ai-customer-support-copilot-silk.vercel.app",
    status: "live",
    backgroundImage: "/project-hover-ai-support-copilot.webp",
    hasPin: true,
  },
  {
    slug: "ai-repo-intelligence",
    title: "AI Repo Intelligence",
    imageTitle: "Codebase Assistant",
    src: "/ai-repo-intelligence.png",
    description: "An AI-powered codebase assistant that enables developers to connect a GitHub repository and ask questions about the codebase using natural language. Instead of manually searching through files, developers can ask questions like 'Where is authentication implemented?' or 'How does the login flow work?' and receive intelligent answers grounded in the actual code.",
    tech: ["next", "ts", "python", "langchain", "rag", "llm", "github", "fastapi"],
    github: "https://github.com/AnmolCanCodes/AI-Repo-Intelligence-Agent",
    live: "https://ai-repo-intelligence-agent.vercel.app",
    status: "live",
    backgroundImage: "/project-hover-ai-repo-intelligence.webp",
    hasPin: true,
  },
];
