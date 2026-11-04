# andrei.portugal — portfolio

Personal portfolio for Ronald Andrei S. Portugal, built with Next.js 16 (App Router, Cache Components) and Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev
```

## Content

All copy lives in `lib/resume.ts`, which also feeds the AI assistant. Edit it there and the hero, stack, timeline, projects and chat stay in sync.

## Resume assistant

`app/api/chat/route.ts` streams answers from any OpenAI-compatible API and is instructed to answer only from the resume. Copy `.env.example` to `.env.local` and set `AI_API_KEY` (a free [Groq](https://console.groq.com/keys) key works out of the box). With no key, it answers offline from the structured resume data (`lib/local-answer.ts`).

## Icons

Solar icons (via `@iconify-json/solar`) and brand logos (Simple Icons) are compiled into a single sprite, `public/icons.svg`. After adding an icon name to `scripts/gen-icons.mjs`, run:

```bash
node scripts/gen-icons.mjs
```
