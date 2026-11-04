import Image from "next/image";
import { CommitLine } from "@/components/commit-line";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { profile } from "@/lib/resume";
import portrait from "@/assets/portrait.webp";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="container-x relative grid items-center gap-8 pb-16 pt-10 md:grid-cols-[1.15fr_0.85fr] md:gap-6 md:pb-24 md:pt-16">
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="hero-in eyebrow">Full-stack developer</p>

          <h1
            className="hero-in mt-4 text-[3.25rem] font-semibold leading-[0.92] tracking-[-0.045em] sm:text-[4rem] md:text-[4.25rem]"
            style={{ "--d": 1 } as React.CSSProperties}
          >
            Andrei
            <br />
            <span className="text-gradient">Portugal</span>
          </h1>

          <div
            className="hero-in mt-6 space-y-3 text-[1.0625rem] leading-relaxed text-muted"
            style={{ "--d": 2 } as React.CSSProperties}
          >
            <p>
              I build modern web solutions and turn my own ideas into useful
              applications that help me grow.
            </p>
            <p>
              Still learning and honing my craft on the way to becoming a{" "}
              <span className="text-fg">full-stack software engineer</span>, and
              adapting AI into the way I work.
            </p>
          </div>

          <div
            className="hero-in mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
            style={{ "--d": 3 } as React.CSSProperties}
          >
            <a
              href={profile.resumePdf}
              download
              className="btn btn-primary h-10 px-5"
            >
              <Icon name="download-minimalistic-bold" /> Download resume
            </a>
            <button
              type="button"
              data-open-chat
              className="btn btn-ghost h-10 px-5"
            >
              <Icon name="chat-round-dots-bold-duotone" className="size-4" />{" "}
              Ask my AI
            </button>
          </div>

          <ul
            className="hero-in mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs text-subtle md:justify-start"
            style={{ "--d": 4 } as React.CSSProperties}
          >
            <li className="flex items-center gap-1.5">
              <Icon name="map-point-bold-duotone" className="size-3.5" /> Santa
              Rosa, Laguna
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-fg"
              >
                github <Icon name="arrow-right-up-linear" className="size-3" />
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-fg"
              >
                linkedin{" "}
                <Icon name="arrow-right-up-linear" className="size-3" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1 hover:text-fg"
              >
                email <Icon name="arrow-right-up-linear" className="size-3" />
              </a>
            </li>
          </ul>
        </div>

        <div
          className="hero-in relative order-1 mx-auto w-60 sm:w-72 md:order-2 md:w-full"
          style={{ "--d": 1 } as React.CSSProperties}
        >
          <div className="relative">
            <div className="portrait-dots" aria-hidden="true" />
            <div className="portrait">
              <Image
                src={portrait}
                alt="Portrait of Andrei Portugal"
                sizes="(min-width: 768px) 18rem, 15rem"
                preload
                className="block h-auto w-full"
              />
            </div>
            <span className="absolute bottom-[22%] right-1 rotate-6 rounded-[30%] p-1 shadow-[var(--shadow)] backdrop-blur-sm md:right-0">
              <Logo size="size-9" />
            </span>
          </div>
          <div className="relative -mt-8 px-2">
            <CommitLine />
          </div>
        </div>
      </div>
    </section>
  );
}
