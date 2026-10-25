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
    title: "GoCredit AI",
    role: "Software Development Engineer Intern",
    dates: "Oct 2026 - Present",
    location: "Bengaluru, India",
    src: "/Experience-image/gocredit-ai.png",
    type: "Hybrid",
    imageFit: "cover",
    imageBleed: true,
    imageZoom: 1,
    description: `
      Fixing credit for 1 billion Indians
      Building a CRM for calling workflows, so agents work from one queue instead of spreadsheets and call logs
      Automating internal reporting that was previously compiled by hand
      Working across internal management tooling that keeps operations running
    `,
    tech: [
      "TypeScript",
      "Python",
      "Backend",
      "AI/ML",
    ],
  },
  {
    title: "OBLIQ",
    role: "GitHub & Product/UI Lead",
    dates: "Sep 2026 - Present",
    location: "Bengaluru, India",
    type: "Remote",
    src: "/Experience-image/obliq-white.png",
    imageFit: "cover",
    imageBleed: true,
    imageZoom: 1,
    description: `
      Leading GitHub and the product/UI side of OBLIQ
      Backed by the NVIDIA Inception, Atlassian, Auth0 by Okta, GitLab, MongoDB, Sarvam, Zendesk and Zoho programs
      Owning repository structure, contribution workflow and release hygiene
      Shaping the product surface and interface decisions as the team builds
    `,
    tech: ["Product", "UI/UX", "GitHub", "Open Source"],
  },
  {
    title: "Google Summer of Code 2026",
    role: "Open Source Contributor, International Catrobat Association",
    dates: "May 2026 - Aug 2026",
    location: "Bengaluru, India",
    src: "/Experience-image/gsoc.png",
    type: "Remote",
    imageFit: "contain",
    imageZoom: 0.9,
    description: `
      Shipped the MQTT networking layer for Pocket Code, an open-source Android app with 1M+ Google Play installs, adding blocks for multiplayer games and IoT / Home Assistant integrations
      Built a thread-safe MQTT message pipeline that decouples the network thread from the render thread via bounded queues, eliminating data races and UI freezes traced to Paho's unbounded broker wait
      Designed the layer for broker- and emulator-independent testing with interfaces, factories and Koin dependency injection
      Wrote 252 tests that uncovered 2 production crashes the prior suite missed
      Worked inside a long-running open-source codebase with community review, contributing 14 merged pull requests across 8 external repositories alongside the core project
    `,
    links: [{ label: "Certificate", href: "https://drive.google.com/file/d/1esx__GWFlp7PnnlyiUdzvTaNlWeS2CUP/view" }],
    tech: [
      "Kotlin",
      "Android",
      "MQTT",
      "Eclipse Paho",
      "Koin",
      "JUnit",
      "Concurrency",
      "Gradle",
    ],
    metrics: [
      { label: "Play Store Installs", value: "1M+" },
      { label: "Tests Written", value: "252" },
      { label: "Crashes Found", value: "2" },
      { label: "Term", value: "May-Aug" },
    ],
  },
  {
    title: "NatWest Group",
    role: "Software Development Engineer Intern",
    dates: "Jun 2026 - Aug 2026",
    location: "Bengaluru, India",
    src: "/Experience-image/natwest-tile.png",
    type: "On-site",
    imageFit: "cover",
    imageBleed: true,
    imageZoom: 1,
    description: `
      Built an AI agent that processed bank DLR logs and ranked data products across 15 business domains, cutting manual discovery time by 95% and auto-generating go-to-market summaries
      Owned the Context Inference Engine for DORA, a multi-agent data platform, implementing 2-hop lineage-graph traversal and Leiden community detection
      Kept GPT-4o labelling behind grounding validation and deterministic fallbacks so the platform never surfaced an ungrounded answer
      Benchmarked Small Language Models under Federated Learning across Customer and Credit Risk domains, holding accuracy within 3-4% of centralized training with data kept inside domain boundaries
    `,
    links: [{ label: "Certificate", href: "https://drive.google.com/file/d/1NAUoppik4VPlXnX0joBAql9xdzmFhvIX/view" }],
    tech: [
      "Python",
      "Multi-Agent Systems",
      "Graph Algorithms",
      "Leiden",
      "GPT-4o",
      "Federated Learning",
      "SLMs",
    ],
    metrics: [
      { label: "Business Domains", value: "15" },
      { label: "Discovery Time Cut", value: "95%" },
      { label: "Accuracy Gap", value: "3-4%" },
      { label: "Lineage Traversal", value: "2-hop" },
    ],
  },
  {
    title: "Samsung R&D Institute Bangalore",
    role: "Research & Development Intern",
    dates: "Jan 2026 - Sep 2026",
    location: "Bengaluru, India",
    src: "/Experience-image/samsung.png",
    type: "Remote",
    imageFit: "contain",
    imageZoom: 0.95,
    description: `
      Built a Kotlin Android data-collection system for Samsung PRISM using Jetpack Compose, Wi-Fi Aware and IEEE 802.11mc on a publish-subscribe architecture, collecting 600+ labelled measurements
      Built a Wi-Fi RTT indoor-localization simulator in Kotlin with embedded Python via Chaquopy and a FastAPI backend, modelling multipath and interference to predict device and access-point position
      Benchmarked 11 regression models across the collected dataset
      Shipped a two-stage ExtraTrees + GradientBoosting pipeline reaching MAE 0.443 m with 87% of predictions within 1 m, a 31% error reduction over the best baseline
    `,
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "IEEE 802.11mc",
      "Wi-Fi Aware",
      "Python",
      "Chaquopy",
      "FastAPI",
      "scikit-learn",
    ],
    metrics: [
      { label: "MAE", value: "0.443 m" },
      { label: "Within 1 m", value: "87%" },
      { label: "Error Reduction", value: "31%" },
      { label: "Models Benchmarked", value: "11" },
    ],
  },
  {
    title: "revdau.ai",
    role: "Software Engineering Intern",
    dates: "Apr 2026 - May 2026",
    location: "Bengaluru, India",
    type: "Hybrid",
    src: "/Experience-image/revdau-tile.png",
    imageFit: "cover",
    imageBleed: true,
    imageZoom: 1,
    description: `
      Built the real-time voice pipeline behind Re-Voice: Twilio media streams into Silero voice-activity detection, Sarvam speech-to-text, a streaming OpenAI LLM and Sarvam text-to-speech over WebSockets
      Implemented barge-in handling so the agent stops mid-sentence the moment a caller interrupts, cancelling already-queued speech instead of talking over them
      Shipped the platform as a Docker Compose deployment across application, AI and observability tiers, instrumented with Prometheus, Loki, Tempo, OpenTelemetry and Grafana, running the voice module across 4 workers
    `,
    tech: ["Python", "WebSockets", "Twilio", "Silero VAD", "Sarvam STT/TTS", "Docker Compose", "Prometheus", "Grafana"],
    metrics: [
      { label: "Workers", value: "4" },
      { label: "Tiers", value: "3" },
      { label: "Pipeline", value: "Streaming" },
      { label: "Term", value: "Apr-May" },
    ],
  },
  {
    title: "Carver Agents",
    role: "Software Engineering Intern",
    dates: "Oct 2025 - Feb 2026",
    location: "Bengaluru, India",
    src: "/Experience-image/carver-tile.png",
    type: "Remote",
    imageFit: "cover",
    imageBleed: true,
    imageZoom: 1,
    description: `
      Built production AI workflows converting regulatory annotations from RSS feeds into automated 3-5 minute podcasts and social posts, processing 10-20+ items per run
      Integrated OpenAI, text-to-speech, AWS S3, Transistor.fm and Slack into a single delivery pipeline, reducing manual effort by 98%+
      Shipped the output publicly at carveragents.ai/podcasts, where the pipeline runs against live regulatory feeds
    `,
    tech: [
      "Python",
      "OpenAI",
      "TTS",
      "AWS S3",
      "Transistor.fm",
      "Slack API",
      "RSS",
    ],
    links: [
      { label: "Certificate", href: "https://drive.google.com/file/d/1B8_qiN9UjAdaUQIM0Ps2F-YaddMIFh6K/view" },
      { label: "Podcasts", href: "https://carveragents.ai/podcasts" },
    ],
    metrics: [
      { label: "Manual Effort Cut", value: "98%+" },
      { label: "Items Per Run", value: "10-20+" },
      { label: "Podcast Length", value: "3-5 min" },
      { label: "Term", value: "Oct-Feb" },
    ],
  },
];
