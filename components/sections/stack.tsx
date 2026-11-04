import { BrandIcon, Icon } from "@/components/icon";
import { techGroups } from "@/lib/resume";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-20 md:py-28">
      <div className="container-x" data-reveal>
        <p className="eyebrow">
          <Icon name="programming-bold-duotone" /> Tech stack
        </p>
        <h2 id="stack-title" className="mt-3 text-3xl font-medium tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.1]">
          What I build with.
        </h2>
        <p className="mt-4 text-muted">Hover a logo to see what it is and where I&apos;ve used it.</p>
      </div>

      <div className="mt-12 border-y border-line" data-reveal>
        <div className="container-x">
          <div className="border-x border-line">
            {techGroups.map((g) => (
              <div
                key={g.id}
                className="flex flex-col gap-6 border-b border-line px-5 py-7 last:border-b-0 md:px-8"
              >
                <h3 className="flex items-center gap-2 text-sm text-muted">
                  <Icon name={g.icon} className="size-4 text-brand-text" />
                  {g.label}
                </h3>
                <ul className="flex flex-wrap items-center gap-x-9 gap-y-7 md:gap-x-11">
                  {g.items.map((t) => (
                    <li key={t.name} className="stack-item group relative grid place-items-center">
                      <BrandIcon name={t.icon} className="size-8 md:size-9" />
                      <span className="stack-tip">
                        <span className="font-medium text-fg">{t.name}</span> · {t.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
