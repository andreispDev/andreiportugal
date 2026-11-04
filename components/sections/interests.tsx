import { Icon } from "@/components/icon";
import { interests } from "@/lib/resume";

export function Interests() {
  return (
    <section id="interests" aria-labelledby="interests-title" className="container-x py-20 md:py-24">
      <div className="max-w-md" data-reveal>
        <p className="eyebrow">
          <Icon name="stars-minimalistic-bold-duotone" /> Interests
        </p>
        <h2 id="interests-title" className="mt-3 text-3xl font-medium tracking-[-0.025em] md:text-[2.25rem] md:leading-[1.1]">
          Beyond the commits.
        </h2>
      </div>

      <h3 className="mt-10 font-mono text-xs uppercase tracking-wider text-subtle" data-reveal>
        Curious about
      </h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {interests.curious.map((it, i) => (
          <li key={it.title} className="card p-5" data-reveal style={{ "--d": i } as React.CSSProperties}>
            <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface-2 text-fg">
              <Icon name={it.icon} className="size-5" />
            </span>
            <p className="mt-4 font-medium tracking-tight">{it.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.body}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 font-mono text-xs uppercase tracking-wider text-subtle" data-reveal>
        Off the clock
      </h3>
      <ul className="mt-3 grid grid-cols-3 gap-3">
        {interests.offline.map((it, i) => (
          <li
            key={it.title}
            className="card flex flex-col items-center gap-3 px-3 py-6 text-center"
            data-reveal
            style={{ "--d": i } as React.CSSProperties}
          >
            <Icon name={it.icon} className="interest-icon size-8 text-fg" />
            <div>
              <p className="text-sm font-medium">{it.title}</p>
              <p className="mt-0.5 text-xs text-subtle">{it.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
