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
    "Works mainly with React, Next.js, TypeScript, Node.js and PostgreSQL. Currently learning how AI and automation can make everyday work easier, building AI features with local LLMs and vector search and trying out new tools that fit into the systems teams already use.",
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
    tech: ["Laravel", "Livewire", "Flux UI", "Tailwind CSS", "PostgreSQL", "Leaflet", "ApexCharts", "Ollama", "pgvector"],
  },
];

export type AboutPoint = { icon: SolarIconName; tag: string; title: string; body: string };

export const about: AboutPoint[] = [
  {
    icon: "palette-round-bold-duotone",
    tag: "Where it started",
    title: "Frontend first",
    body: "I started as a frontend developer, drawn to building modern, slick and visually appealing websites that feel good to use.",
  },
  {
    icon: "server-square-bold-duotone",
    tag: "2024",
    title: "Then the backend",
    body: "I got curious about what happens behind the interface and moved into backend development: APIs, databases and security.",
  },
  {
    icon: "cloud-upload-bold-duotone",
    tag: "Learning",
    title: "Into DevOps",
    body: "After the backend I started learning DevOps: deployments, containers and CI pipelines that ship code safely.",
  },
  {
    icon: "users-group-rounded-bold-duotone",
    tag: "Now",
    title: "Building for where I belong",
    body: "These days I build projects for the organization I'm part of, tools that help us in our day-to-day work.",
  },
];

// Freelance work for clients, separate from the systems built at work.
export const clientProjects: Project[] = [
  {
    id: "pos",
    title: "Point-of-Sale System",
    role: "Client project",
    org: "Client",
    icon: "cart-large-2-bold-duotone",
    blurb: "A POS system built for a client to handle sales and day-to-day transactions at the counter.",
    highlights: [],
    tech: [],
  },
  {
    id: "funeral",
    title: "Funeral Service Appointment System",
    role: "Client project",
    org: "Client",
    icon: "calendar-mark-bold-duotone",
    blurb: "An appointment system for a funeral service, so families can book and the staff can manage schedules.",
    highlights: [],
    tech: [],
  },
  {
    id: "webpages",
    title: "Client Web Pages",
    role: "Client project",
    org: "Client",
    icon: "monitor-bold-duotone",
    blurb: "Websites and landing pages designed and built for clients.",
    highlights: [],
    tech: [],
  },
];

export type TimelineEntry = {
  id: string;
  when: string;
  title: string;
  place?: string;
  icon: SolarIconName;
  body: string;
  current?: boolean;
};

// Newest first. Roles only; work projects live in the Projects section.
export const timeline: TimelineEntry[] = [
  {
    id: "fullstack",
    when: "2025 – Present",
    title: "Full-Stack Developer",
    place: "Philippine Navy",
    icon: "case-minimalistic-bold-duotone",
    body: "Grew from maintaining systems and shipping enhancements to building complete solutions end to end.",
    current: true,
  },
  {
    id: "frontend",
    when: "2023 – 2025",
    title: "Frontend Developer",
    place: "Philippine Navy",
    icon: "palette-round-bold-duotone",
    body: "My first role after college: building clean, responsive interfaces and improving the user experience of internal systems.",
  },
  {
    id: "internship",
    when: "Feb – May 2023",
    title: "Web Development Intern",
    place: "Lamina Studios",
    icon: "pen-new-square-bold-duotone",
    body: "Sharpened my skills building website pages and worked on Solitary Studios, a startup project that is now a company.",
  },
  {
    id: "college",
    when: "2019 – 2023",
    title: "BS Information Technology",
    place: "Laguna State Polytechnic University, Los Baños",
    icon: "square-academic-cap-bold-duotone",
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

export type Interest = { icon: SolarIconName; title: string; body: string };

export const interests: { curious: Interest[]; offline: Interest[] } = {
  curious: [
    {
      icon: "magic-stick-3-bold-duotone",
      title: "Automation",
      body: "Turning repetitive work into processes that run themselves: scripts, CI pipelines and workflows.",
    },
    {
      icon: "telescope-bold-duotone",
      title: "Where AI is heading",
      body: "Digging deeper into how AI will evolve, from local models to agents, and what that means for building software.",
    },
  ],
  offline: [
    { icon: "gamepad-bold-duotone", title: "PC gaming", body: "Mostly Dota 2" },
    { icon: "basketball-bold-duotone", title: "Basketball", body: "Playing the game" },
    { icon: "headphones-round-sound-bold-duotone", title: "Music", body: "Always in the background" },
  ],
};

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
    "Career path: 2019–2023 BS IT at LSPU Los Baños; internship at Lamina Studios, Feb–May 2023 (built website pages and worked on Solitary Studios, a startup project that is now a company); 2023–2025 Frontend Developer at the Philippine Navy; became interested in backend development in 2024; Full-Stack Developer since 2025, growing from maintaining systems and enhancements to building complete solutions, including projects that help his organization in its day-to-day work. He is still learning and honing his skills to become a full-stack engineer, and is adapting AI into how he works.",
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
    "  • Awareness: moved report encryption off the main request path; server-side search, filtering and paging; reworked rate limits so personnel sharing one public IP could still submit.",
    "  • Monitoring: fixed cards and table rows lagging behind theme changes by suspending transitions; fixed unreadable dark-mode dropdowns; redesigned sign-in screens and sign-in code email; blocked double submits; added an interface size setting applied before first paint; per-user saved map colors; dashboard widget per category with its own permission; manual testing before merges.",
    "",
    "CLIENT PROJECTS (freelance):",
    ...clientProjects.map((p) => `- ${p.title}: ${p.blurb}`),
    "He has not publicly shipped/launched products; his work is internal systems and client projects.",
    "",
    "TECHNICAL SKILLS:",
    "Languages: TypeScript, JavaScript, SQL, HTML, CSS",
    "Frontend: React, Next.js, shadcn/ui, Tailwind CSS, Bootstrap 5",
    "Backend: Node.js, Express, Laravel, Socket.IO, REST APIs",
    "Databases: PostgreSQL, MySQL, Redis, Drizzle ORM",
    "AI: Ollama, RAG, pgvector, LLM integration",
    `Security: ${security.join(", ")}`,
    "DevOps: Docker, GitHub Actions, CI/CD pipelines",
    "Testing: Vitest, Jest, manual testing",
    "Tools: Git, GitHub, GitLab, pgAdmin",
    "",
    "INTERNSHIP: Intern Web Developer, Solitary Studio's Website Project — Lamina Studios (remote), Feb 2023 – May 2023. Built a website for a start-up game development company showcasing its portfolio of horror games, using HTML5, CSS3, Bootstrap, JavaScript, PHP and MySQL, with images, videos, parallax effects and dropdowns; presented it to the other interns and the supervisor.",
    "",
    `EDUCATION: ${education.degree} — ${education.school}, ${education.years}`,
    "",
    "INTERESTS (from Andrei, not on the PDF resume):",
    "- Playing computer games, especially Dota 2",
    "- Basketball",
    "- Music",
    "- Automation: turning repetitive work into automated processes",
    "- Digging deeper into how AI will evolve in the future",
  );
  return lines.join("\n");
}
