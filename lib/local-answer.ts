import { education, profile, projects, security, techGroups } from "./resume";

// Offline fallback used when no AI key is configured or the provider fails.
// Matches the question to a resume topic and answers from the structured data.

const project = (id: string) => projects.find((p) => p.id === id)!;
const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

const topics: { keys: RegExp; answer: () => string }[] = [
  {
    keys: /inventor|stock|forecast/,
    answer: () => {
      const p = project("inventory");
      return `${p.title} (${p.role}, ${p.org}, ${p.period}):\n${bullets(p.highlights)}\nIts assistant found the right item in the top 3 results 97.5% of the time and answered 83% of test questions correctly.`;
    },
  },
  {
    keys: /awareness|report|insider|survey|encrypt/,
    answer: () => {
      const p = project("awareness");
      return `${p.title} (${p.role}, ${p.org}):\n${bullets(p.highlights)}`;
    },
  },
  {
    keys: /monitor|map|leaflet|livewire|lead|threat/,
    answer: () => {
      const p = project("monitoring");
      return `${p.title} (${p.role}, ${p.org}, from ${p.period}):\n${bullets(p.highlights)}`;
    },
  },
  {
    keys: /\bai\b|llm|ollama|rag|vector|assistant|machine/,
    answer: () =>
      `Andrei has built two AI assistants on self-hosted Ollama models:\n- Inventory system: keyword + pgvector search with links to source records (97.5% top-3 retrieval, 83% correct answers on test questions).\n- Monitoring system: similarity search limited to records each user may see, with citation checks and prompt logging.\nHe is currently learning more about local LLMs and vector search.`,
  },
  {
    keys: /secur|auth|otp|sign.?in|rbac|rate/,
    answer: () =>
      `Security is a recurring theme in Andrei's work:\n${bullets([
        ...security,
        "AES-256-GCM encryption and SHA-256 integrity checks for sensitive reports",
        "PostgreSQL row-level security per office, strict Content Security Policy",
      ])}`,
  },
  {
    keys: /stack|skill|tech|language|framework|tool|use|know/,
    answer: () =>
      `Andrei mainly works with React, Next.js, TypeScript, Laravel and PostgreSQL.\n${techGroups
        .map((g) => `- ${g.label}: ${g.items.map((i) => i.name).join(", ")}`)
        .join("\n")}`,
  },
  {
    keys: /educat|school|degree|universit|college|study|graduat/,
    answer: () => `${education.degree} — ${education.school}, ${education.years}.`,
  },
  {
    keys: /contact|email|hire|reach|linkedin|github/,
    answer: () =>
      `You can reach Andrei at ${profile.email}. GitHub: ${profile.github} · LinkedIn: ${profile.linkedin}.`,
  },
  {
    keys: /experience|work|job|year|navy|who|about|summary|background/,
    answer: () =>
      `${profile.summary} ${profile.focus}\nAt the Philippine Navy he has worked on:\n${bullets(
        projects.map((p) => `${p.role}, ${p.title}`),
      )}`,
  },
];

export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const hit = topics.find((t) => t.keys.test(q));
  return hit
    ? hit.answer()
    : "I can only answer questions about Andrei's resume — try asking about his projects, stack or experience.";
}
