import { Icon } from "@/components/icon";
import { about } from "@/lib/resume";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-x py-16 md:py-20">
      <div className="max-w-md" data-reveal>
        <p className="eyebrow">
          <Icon name="user-rounded-bold-duotone" /> About
        </p>
        <h2 id="about-title" className="mt-3 text-3xl font-medium tracking-[-0.025em] md:text-[2.25rem] md:leading-[1.1]">
          A bit about me.
        </h2>
      </div>

      <ol className="mt-10 grid gap-3 sm:grid-cols-2">
        {about.map((a, i) => (
          <li key={a.title} className="card flex flex-col p-5" data-reveal style={{ "--d": i } as React.CSSProperties}>
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface-2 text-fg">
                <Icon name={a.icon} className="size-5" />
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-subtle">{a.tag}</span>
            </div>
            <h3 className="mt-5 font-medium tracking-tight">{a.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
