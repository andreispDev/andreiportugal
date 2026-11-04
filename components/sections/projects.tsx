import Image from "next/image";
import { Icon } from "@/components/icon";
import { ShotTabs } from "@/components/shot-tabs";
import { profile, projects, type Project } from "@/lib/resume";
import dashDark from "@/assets/projects/inventory-dashboard-dark.webp";
import dashLight from "@/assets/projects/inventory-dashboard-light.webp";
import signIn from "@/assets/projects/inventory-signin.webp";

const SIZES = "(min-width: 1024px) 44rem, 100vw";

function ProjectLink({ project }: { project: Project }) {
  return project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
      View project <Icon name="arrow-right-up-linear" className="size-3.5" />
    </a>
  ) : (
    <a
      href={`mailto:${profile.email}?subject=${encodeURIComponent(`Walkthrough: ${project.title}`)}`}
      className="btn btn-ghost"
    >
      Request a walkthrough <Icon name="arrow-right-linear" className="size-3.5" />
    </a>
  );
}

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" aria-labelledby="projects-title" className="container-x py-20 md:py-28">
      <div className="max-w-2xl" data-reveal>
        <p className="eyebrow">
          <Icon name="code-square-bold-duotone" /> Selected work
        </p>
        <h2 id="projects-title" className="mt-3 text-3xl font-medium tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.1]">
          Things I&apos;ve shipped.
        </h2>
      </div>

      <article
        className="card mt-12 grid gap-8 p-5 md:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center [&>*]:min-w-0"
        data-reveal
        aria-labelledby="p-featured"
      >
        <div>
          <span className="chip">Featured · {featured.period}</span>
          <h3 id="p-featured" className="mt-4 text-2xl font-medium tracking-tight">
            {featured.title}
          </h3>
          <p className="mt-1 text-sm text-subtle">{featured.role}</p>
          <p className="mt-4 leading-relaxed text-muted">{featured.blurb}</p>
          {featured.metrics && (
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {featured.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse bg-surface-2 px-4 py-3">
                  <dt className="text-xs text-subtle">{m.label}</dt>
                  <dd className="text-2xl font-medium tracking-tight">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-6">
            <Tech items={featured.tech.slice(0, 7)} />
          </div>
          <div className="mt-7">
            <ProjectLink project={featured} />
          </div>
        </div>

        <ShotTabs
          shots={[
            {
              id: "dashboard",
              label: "Dashboard",
              url: "inventory / dashboard",
              // Follows the site theme: dark site shows the dark dashboard.
              image: (
                <>
                  <Image src={dashLight} alt="Inventory dashboard in light theme with item status, office and stock charts" sizes={SIZES} placeholder="blur" className="block h-auto w-full dark:hidden" />
                  <Image src={dashDark} alt="Inventory dashboard in dark theme with item status, office and stock charts" sizes={SIZES} placeholder="blur" className="hidden h-auto w-full dark:block" />
                </>
              ),
            },
            {
              id: "signin",
              label: "Sign-in",
              url: "inventory / sign-in",
              image: <Image src={signIn} alt="Inventory sign-in screen with one-time email code" sizes={SIZES} placeholder="blur" className="block h-auto w-full" />,
            },
          ]}
        />
      </article>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.map((p, i) => (
          <article
            key={p.id}
            className="card flex flex-col p-6 hover:-translate-y-1 hover:border-line-strong"
            data-reveal
            style={{ "--d": i + 1 } as React.CSSProperties}
            aria-labelledby={`p-${p.id}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface-2 text-brand-text">
                <Icon name={p.icon} className="size-5" />
              </span>
              <span className="chip">{p.role}</span>
            </div>
            <h3 id={`p-${p.id}`} className="mt-5 text-lg font-medium tracking-tight">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
            <div className="mt-5">
              <Tech items={p.tech.slice(0, 5)} />
            </div>
            <div className="mt-auto pt-6">
              <ProjectLink project={p} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
