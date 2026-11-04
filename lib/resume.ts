import type { BrandIconName, SolarIconName } from "./icons.generated";

// Single source of truth for everything the site and the AI assistant say.
// Content mirrors the ATS resume; the UI shows a brief subset of it.

export const profile = {
  name: "Ronald Andrei S. Portugal",
  shortName: "Andrei Portugal",
  role: "Full-Stack Developer",
  location: "Santa Rosa, Laguna, Philippines",
  email: "andreispdev@gmail.com",
  github: "https://github.com/andreispDev",
  linkedin: "https://linkedin.com/in/andreispdev",
  yearsExperience: 3,
  resumePdf: "/resume/Ronald-Andrei-Portugal-Resume.pdf",
  summary:
    "Full-stack developer with 3 years of experience building web applications for the government sector, including leading frontend work on an internal monitoring system.",
  focus:
    "Works mainly with React, Next.js, TypeScript, Laravel and PostgreSQL, and is currently learning to build AI features with local LLMs and vector search.",
};

export type Project = {
  id: string;
  title: string;
  role: string;
  org: string;
  period?: string;
  icon: SolarIconName;
  blurb: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  tech: string[];
  // Public link to a live demo or repository. Leave empty for private systems;
  // the card then offers a walkthrough by email instead.
  url?: string;
};

export const projects: Project[] = [
  {
    id: "inventory",
    title: "AI-Powered Inventory System",
    role: "Full-Stack Developer",
    org: "Philippine Navy",
    period: "Present",
    icon: "box-bold-duotone",
    blurb:
      "Multi-office inventory with stock tracking, transfers, audit logs and an AI assistant running on a local model.",
    highlights: [
      "Stock tracking, item assignments, transfers, audit logs, CSV/PDF export and stock-out forecasts.",
      "AI assistant on a local Ollama model combining keyword and pgvector search, with links to source records.",
      "PostgreSQL row-level security so each office only sees its own data — including through the assistant.",
      "Email code sign-in, idle sign-out, rate limits and tests for data separation, shipped through staging.",
    ],
    metrics: [
      { value: "97.5%", label: "right item in top 3" },
      { value: "83%", label: "questions answered correctly" },
    ],
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "pgvector", "Redis", "Ollama", "Vitest", "GitHub Actions"],
  },
  {
    id: "awareness",
    title: "Awareness Reporting Platform",
    role: "Full-Stack Developer",
    org: "Philippine Navy",
    period: "2024",
    icon: "shield-keyhole-bold-duotone",
    blurb:
      "Secure platform for anonymous insider-threat reporting, awareness surveys and administrative case review.",
    highlights: [
      "Reports and evidence encrypted with AES-256-GCM, SHA-256 integrity checks and audit logging.",
      "Password and email OTP sign-in, role-based access, account lockout and instantly revocable sessions.",
      "Real-time admin dashboard with notifications, charts, CSV export and account management.",
      "Strict CSP, Docker + HTTPS deployment, automated daily backups, CI and automated tests.",
    ],
    metrics: [
      { value: "AES-256", label: "GCM encryption at rest" },
      { value: "Daily", label: "automated backups" },
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.IO", "Docker", "Caddy", "nginx"],
  },
  {
    id: "monitoring",
    title: "Monitoring System",
    role: "Frontend Lead",
    org: "Philippine Navy",
    period: "2023",
    icon: "map-point-wave-bold-duotone",
    blurb:
      "Internal system for encoding, reviewing, mapping and analyzing threat records across user roles.",
    highlights: [
      "Led frontend and coordinated with DevOps and backend on APIs and deployments.",
      "Shared page, table and chart components, loading skeletons, light and dark themes.",
      "Full-page map with category colors, legend, clusters ringed by category share and detail modals.",
      "Self-hosted AI assistant with permission-scoped similarity search, citation checks and prompt logging.",
    ],
    metrics: [
      { value: "Lead", label: "frontend across roles" },
      { value: "RAG", label: "permission-scoped" },
    ],
    tech: ["Laravel", "Livewire", "Flux UI", "Tailwind CSS", "PostgreSQL", "Leaflet", "ApexCharts", "Ollama", "pgvector"],
  },
];

export type TimelineEntry = {
  id: string;
  when: string;
  title: string;
  place?: string;
  body: string;
  tags?: string[];
  current?: boolean;
};

// Newest first. Years come from Andrei; project details from the resume.
export const timeline: TimelineEntry[] = [
  {
    id: "present",
    when: "Present",
    title: "Full-Stack Developer — AI-Powered Inventory System",
    place: "Philippine Navy",
    body: "Next.js + PostgreSQL inventory for multiple offices, with an AI assistant on a local model that only sees each office's own records.",
    tags: ["Next.js", "PostgreSQL", "Ollama", "pgvector"],
    current: true,
  },
  {
    id: "ai",
    when: "2025",
    title: "Adopting AI-assisted development",
    body: "Brought AI into the daily workflow and started building AI features: local LLMs with Ollama, retrieval (RAG) and pgvector search.",
    tags: ["Ollama", "RAG", "pgvector"],
  },
  {
    id: "fullstack",
    when: "2024",
    title: "Handled a full-stack project",
    place: "Awareness Reporting Platform",
    body: "Owned the stack end to end: React frontend, Node.js API, PostgreSQL, encryption, OTP sign-in and Docker deployment.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: "hired",
    when: "2023",
    title: "Graduated and hired as a frontend developer",
    place: "Philippine Navy — Monitoring System",
    body: "Led the frontend: shared page, table and chart components, light and dark themes and the map experience.",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "Leaflet"],
  },
  {
    id: "interest",
    when: "2021 – 2022",
    title: "Got into web development",
    body: "Started building for the web with HTML, CSS, JavaScript and PHP.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
  },
  {
    id: "college",
    when: "2019 – 2023",
    title: "BS Information Technology",
    place: "Laguna State Polytechnic University, Los Baños",
    body: "Majored in Web and Mobile Development.",
  },
];

export type Tech = {
  name: string;
  icon: BrandIconName;
  note: string;
};

export type TechGroup = {
  id: string;
  label: string;
  icon: SolarIconName;
  items: Tech[];
};

// Shown as a logo wall, so every entry needs a brand icon.
export const techGroups: TechGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "widget-5-bold-duotone",
    items: [
      { name: "React", icon: "react", note: "Awareness platform and inventory UIs" },
      { name: "Next.js", icon: "nextdotjs", note: "AI-powered inventory system" },
      { name: "TypeScript", icon: "typescript", note: "Default across recent projects" },
      { name: "JavaScript", icon: "javascript", note: "Where it all started" },
      { name: "HTML", icon: "html5", note: "Semantic, accessible markup" },
      { name: "CSS", icon: "css", note: "Theming and layout" },
      { name: "Tailwind CSS", icon: "tailwindcss", note: "Shared component systems" },
      { name: "Bootstrap", icon: "bootstrap", note: "Responsive layouts and components" },
      { name: "shadcn/ui", icon: "shadcnui", note: "Accessible React primitives" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server-square-bold-duotone",
    items: [
      { name: "Node.js", icon: "nodedotjs", note: "Reporting platform API" },
      { name: "Express", icon: "express", note: "REST APIs" },
      { name: "Socket.IO", icon: "socketdotio", note: "Real-time notifications" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "database-bold-duotone",
    items: [
      { name: "PostgreSQL", icon: "postgresql", note: "Primary DB, row-level security" },
      { name: "MySQL", icon: "mysql", note: "Relational database work" },
      { name: "Drizzle ORM", icon: "drizzle", note: "Type-safe SQL in TypeScript" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "settings-minimalistic-bold-duotone",
    items: [
      { name: "Docker", icon: "docker", note: "Deploys with HTTPS and backups" },
      { name: "GitHub Actions", icon: "githubactions", note: "CI type checks and tests" },
      { name: "Git", icon: "git", note: "Staging branch before main" },
      { name: "GitHub", icon: "github", note: "Code review and CI" },
      { name: "GitLab", icon: "gitlab", note: "Team repositories" },
      { name: "Ollama", icon: "ollama", note: "Self-hosted local LLMs" },
      { name: "Jest", icon: "jest", note: "JavaScript unit tests" },
    ],
  },
];

export const security = [
  "Role-based access control",
  "OTP sign-in",
  "Encryption",
  "Rate limiting",
  "Audit logging",
];

export const education = {
  degree: "Bachelor of Science in Information Technology, Major in Web and Mobile Development",
  school: "Laguna State Polytechnic University, Los Baños Campus",
  years: "2019 – 2023",
};

// Context handed to the AI assistant. Personal phone numbers and references are
// deliberately left out; visitors are pointed to email instead.
export function resumeContext(): string {
  const lines: string[] = [
    `Name: ${profile.name} (goes by Andrei)`,
    `Role: ${profile.role}`,
    `Location: ${profile.location}`,
    `Contact: ${profile.email} · GitHub ${profile.github} · LinkedIn ${profile.linkedin}`,
    `Summary: ${profile.summary} ${profile.focus}`,
    "",
    "Career path: 2019–2023 BS IT at LSPU Los Baños; 2021–2022 got into web development; 2023 graduated and was hired by the Philippine Navy as a frontend developer (Frontend Lead, Monitoring System); 2024 handled a full-stack project (Awareness Reporting Platform); 2025 adopted AI-assisted development and began building AI features with local LLMs; present: Full-Stack Developer on the AI-Powered Inventory System.",
    `Resume PDF: downloadable from this site (${profile.resumePdf}).`,
    "",
    "WORK EXPERIENCE (all at the Philippine Navy):",
  ];
  for (const p of projects) {
    lines.push(
      `- ${p.role}, ${p.title}${p.period ? ` (${p.period})` : ""}`,
      `  Tech: ${p.tech.join(", ")}`,
      ...p.highlights.map((h) => `  • ${h}`),
    );
  }
  lines.push(
    "  • Inventory: fixed GitHub Actions type checks that failed because Next.js route types were not generated on a clean machine.",
    "  • Inventory: assistant evaluated on sample questions — right item in top 3 results 97.5% of the time, 83% of questions answered correctly.",
    "  • Awareness: moved report encryption off the main request path; server-side search, filtering and paging; reworked rate limits so personnel sharing one public IP could still submit.",
    "  • Monitoring: fixed cards and table rows lagging behind theme changes by suspending transitions; fixed unreadable dark-mode dropdowns; redesigned sign-in screens and sign-in code email; blocked double submits; added an interface size setting applied before first paint; per-user saved map colors; dashboard widget per category with its own permission; manual testing before merges.",
    "",
    "TECHNICAL SKILLS:",
    "Languages: TypeScript, JavaScript, PHP, SQL, HTML, CSS",
    "Frontend: React, Next.js, Livewire, Flux UI, shadcn/ui, Tailwind CSS, Leaflet, ApexCharts",
    "Backend: Node.js, Express, Laravel, Socket.IO, REST APIs",
    "Databases: PostgreSQL, MySQL, Redis, Drizzle ORM",
    "AI: Ollama, RAG, pgvector, LLM integration",
    `Security: ${security.join(", ")}`,
    "DevOps: Docker, GitHub Actions, CI/CD pipelines",
    "Testing: Vitest, Jest, Pest, PHPStan, manual testing",
    "Tools: Git, GitHub, GitLab, pgAdmin",
    "",
    `EDUCATION: ${education.degree} — ${education.school}, ${education.years}`,
  );
  return lines.join("\n");
}
