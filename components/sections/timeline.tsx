import { Icon } from "@/components/icon";
import { timeline } from "@/lib/resume";

export function Timeline() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line bg-bg-alt/60 py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-xl" data-reveal>
          <p className="eyebrow">
            <Icon name="history-bold-duotone" /> Experience
          </p>
          <h2 id="experience-title" className="mt-3 text-3xl font-medium tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.1]">
            The road so far.
          </h2>
          <p className="mt-4 text-muted">From college and an internship to building full-stack solutions.</p>
        </div>

        <div className="tl mt-14" data-timeline>
          <div className="tl-rail" aria-hidden="true">
            <div className="tl-fill" />
          </div>
          <ol className="space-y-12">
            {timeline.map((t, i) => (
              <li
                key={t.id}
                className="relative grid gap-2 pl-10 md:grid-cols-[8rem_1fr] md:gap-0 md:pl-0"
                data-tl-item
                data-reveal
                style={{ "--d": i * 0.5 } as React.CSSProperties}
              >
                <p className="tl-year font-mono text-sm text-subtle md:pr-8 md:pt-0.5 md:text-right">
                  {t.when}
                </p>
                <span className="tl-dot absolute left-0 top-0.5 md:left-[8rem]" aria-hidden="true" />
                <div className="md:pl-12">
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon name={t.icon} className="size-4 text-subtle" />
                    <h3 className="text-lg font-medium tracking-tight">{t.title}</h3>
                    {t.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2 py-0.5 text-[0.6875rem] text-brand-text">
                        <span className="size-1.5 animate-pulse rounded-full bg-brand-text" /> now
                      </span>
                    )}
                  </div>
                  {t.place && <p className="mt-0.5 text-sm text-subtle">{t.place}</p>}
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
