import Image from "next/image";
import { Carousel } from "@/components/carousel";
import { Icon } from "@/components/icon";
import { clientProjects, profile, projects, type Project } from "@/lib/resume";
import dashDark from "@/assets/projects/inventory-dashboard-dark.webp";
import dashLight from "@/assets/projects/inventory-dashboard-light.webp";

const SIZES = "(min-width: 768px) 40rem, 90vw";

function ProjectLink({ project }: { project: Project }) {
  return project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary"
    >
      View project <Icon name="arrow-right-up-linear" className="size-3.5" />
    </a>
  ) : (
    <a
      href={`mailto:${profile.email}?subject=${encodeURIComponent(`Walkthrough: ${project.title}`)}`}
      className="btn btn-ghost"
    >
      Request a walkthrough{" "}
      <Icon name="arrow-right-linear" className="size-3.5" />
    </a>
  );
}

function Cover({ project }: { project: Project }) {
  if (project.id === "inventory") {
    // Follows the site theme: dark site shows the dark dashboard.
    return (
      <>
        {/* <Image
          src={dashLight}
          alt="Inventory dashboard, light theme"
          sizes={SIZES}
          placeholder="blur"
          draggable={false}
          className="block size-full object-cover object-left-top dark:hidden"
        />
        <Image
          src={dashDark}
          alt="Inventory dashboard, dark theme"
          sizes={SIZES}
          placeholder="blur"
          draggable={false}
          className="hidden size-full object-cover object-left-top dark:block"
        /> */}
      </>
    );
  }
  return (
    <div
      className="project-cover grid size-full place-items-center"
      aria-hidden="true"
    >
      <span className="grid size-16 place-items-center rounded-2xl border border-line-strong bg-surface text-fg shadow-[var(--shadow)]">
        <Icon name={project.icon} className="size-8" />
      </span>
    </div>
  );
}

export function Projects() {
  const all = [...projects, ...clientProjects];

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="container-x py-20 md:py-24"
    >
      <div className="max-w-md" data-reveal>
        <p className="eyebrow">
          <Icon name="code-square-bold-duotone" /> Selected work
        </p>
        <h2
          id="projects-title"
          className="mt-3 text-3xl font-medium tracking-[-0.025em] md:text-[2.25rem] md:leading-[1.1]"
        >
          Things I&apos;ve built.
        </h2>
        <p className="mt-3 text-muted">
          Systems for work and projects for clients. Swipe or drag through them.
        </p>
      </div>

      <div className="mt-8" data-reveal>
        <Carousel
          labels={all.map((p) => p.title)}
          icons={{
            prev: <Icon name="alt-arrow-left-linear" className="size-4" />,
            next: <Icon name="alt-arrow-right-linear" className="size-4" />,
          }}
        >
          {all.map((p) => (
            <article
              key={p.id}
              className="card flex h-full select-none flex-col overflow-hidden"
              aria-labelledby={`p-${p.id}`}
            >
              <div className="project-media aspect-[2/1] overflow-hidden border-b border-line bg-surface-2">
                <Cover project={p} />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="font-mono text-xs text-subtle">
                  {p.role}
                  {p.period && ` · ${p.period}`}
                </p>
                <h3
                  id={`p-${p.id}`}
                  className="mt-2 text-xl font-medium tracking-tight"
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.blurb}
                </p>
                {p.tech.length > 0 && (
                  <ul
                    className="mt-4 flex flex-wrap gap-1.5"
                    aria-label="Technologies"
                  >
                    {p.tech.slice(0, 6).map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-6">
                  <ProjectLink project={p} />
                </div>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
