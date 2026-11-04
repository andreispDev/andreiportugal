import { Icon } from "@/components/icon";
import { profile } from "@/lib/resume";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="bg-grid" aria-hidden="true" />
      <div className="container-x relative flex flex-col items-center pb-20 pt-16 text-center md:pb-28 md:pt-28">
        <p className="hero-in eyebrow">
          {profile.name} · {profile.role}
        </p>

        <h1
          className="hero-in mt-5 max-w-4xl text-[2.6rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]"
          style={{ "--d": 1 } as React.CSSProperties}
        >
          Secure web systems,
          <br />
          <span className="text-gradient">built end to end.</span>
        </h1>

        <p
          className="hero-in mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted"
          style={{ "--d": 2 } as React.CSSProperties}
        >
          {profile.yearsExperience} years building government web apps with React, Next.js, Laravel and PostgreSQL —
          from frontend lead to full-stack, now adding AI with local LLMs and vector search.
        </p>

        <div className="hero-in mt-9 flex flex-wrap justify-center gap-3" style={{ "--d": 3 } as React.CSSProperties}>
          <a href={profile.resumePdf} download className="btn btn-primary h-10 px-5">
            <Icon name="download-minimalistic-bold" /> Download resume
          </a>
          <button type="button" data-open-chat className="btn btn-ghost h-10 px-5">
            <Icon name="chat-round-dots-bold-duotone" className="size-4 text-brand-text" /> Ask my AI
          </button>
        </div>

        <ul
          className="hero-in mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted"
          style={{ "--d": 4 } as React.CSSProperties}
        >
          <li className="flex items-center gap-2">
            <Icon name="map-point-bold-duotone" className="size-4 text-brand-text" /> Santa Rosa, Laguna
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 underline-offset-4 hover:text-fg hover:underline">
              <Icon name="letter-bold-duotone" className="size-4 text-brand-text" /> {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 underline-offset-4 hover:text-fg hover:underline">
              GitHub <Icon name="arrow-right-up-linear" className="size-3.5" />
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 underline-offset-4 hover:text-fg hover:underline">
              LinkedIn <Icon name="arrow-right-up-linear" className="size-3.5" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
