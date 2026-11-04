import { ChatWidget } from "@/components/chat";
import { Icon } from "@/components/icon";
import { Interactions } from "@/components/interactions";
import { Logo } from "@/components/logo";
import { About } from "@/components/sections/about";
import { GithubActivity } from "@/components/sections/github";
import { Hero } from "@/components/sections/hero";
import { Interests } from "@/components/sections/interests";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Timeline } from "@/components/sections/timeline";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/resume";

function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="container-x py-16 md:py-20">
        <div className="card overflow-hidden p-8 md:p-12" data-reveal>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_100%_0%,color-mix(in_srgb,var(--brand-text)_14%,transparent),transparent_60%)]"
          />
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-medium tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.1]">
                Have a system to build?
              </h2>
              <p className="mt-3 text-muted">Open to full-stack and frontend roles. The quickest way to reach me is email.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                <Icon name="letter-bold-duotone" /> {profile.email}
              </a>
              <a href={profile.resumePdf} download className="btn btn-ghost">
                <Icon name="download-minimalistic-bold" /> Resume
              </a>
              <a href={profile.github} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                GitHub <Icon name="arrow-right-up-linear" className="size-3.5" />
              </a>
              <a href={profile.linkedin} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                LinkedIn <Icon name="arrow-right-up-linear" className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2 text-xs text-subtle">
          <Logo size="size-6" /> © {profile.name}
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader
        icons={{
          logo: <Logo />,
          sun: <Icon name="sun-2-bold-duotone" />,
          moon: <Icon name="moon-bold-duotone" />,
          compact: <Icon name="minimize-square-3-bold-duotone" />,
          comfortable: <Icon name="maximize-square-3-bold-duotone" />,
          menu: <Icon name="hamburger-menu-linear" />,
          close: <Icon name="close-square-linear" />,
          palette: <Icon name="palette-round-bold-duotone" />,
        }}
      />
      <main id="main">
        <Hero />
        <About />
        <Stack />
        <Timeline />
        <Projects />
        <GithubActivity />
        <Interests />
      </main>
      <Footer />
      <ChatWidget
        icons={{
          send: <Icon name="plain-bold" className="size-4" />,
          stop: <Icon name="stop-circle-bold" className="size-4" />,
          spark: <Icon name="stars-minimalistic-bold-duotone" className="size-4" />,
          user: <Icon name="user-rounded-bold-duotone" className="size-3.5" />,
          reset: <Icon name="refresh-linear" className="size-3.5" />,
          close: <Icon name="close-square-linear" className="size-4" />,
          chat: <Icon name="chat-round-dots-bold-duotone" className="size-6" />,
        }}
      />
      <Interactions />
    </>
  );
}
