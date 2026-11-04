import { BrandIcon, Icon } from "@/components/icon";
import { GITHUB_USER, getContributions, type Day } from "@/lib/github";

const fmtDay = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function stats(days: Day[]) {
  let longest = 0;
  let run = 0;
  let busiest = days[0];
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    if (d.count > busiest.count) busiest = d;
  }
  return { longest, busiest };
}

// Pads the first week so every column runs Sunday → Saturday, like GitHub's calendar.
function toWeeks(days: Day[]) {
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(lead).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function monthOf(week: (Day | null)[]) {
  const first = week.find(Boolean);
  return first ? new Date(`${first.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) : "";
}

export async function GithubActivity() {
  const contrib = await getContributions();
  const profileUrl = `https://github.com/${GITHUB_USER}`;
  const weeks = contrib ? toWeeks(contrib.days) : [];
  const s = contrib ? stats(contrib.days) : null;
  const cols = { "--weeks": weeks.length } as React.CSSProperties;

  return (
    <section id="activity" aria-labelledby="activity-title" className="container-x py-20 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
        <div className="max-w-md">
          <p className="eyebrow">
            <Icon name="git-branch-bold-duotone" /> GitHub
          </p>
          <h2 id="activity-title" className="mt-3 text-3xl font-medium tracking-[-0.025em] md:text-[2.25rem] md:leading-[1.1]">
            Commits, not just claims.
          </h2>
        </div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <BrandIcon name="github" className="size-4 text-fg!" /> @{GITHUB_USER}
        </a>
      </div>

      <div className="card mt-8 p-5 md:p-6" data-reveal>
        {contrib && s ? (
          <>
            <dl className="grid grid-cols-3 gap-4">
              <div>
                <dt className="text-xs text-subtle">Last 12 months</dt>
                <dd className="mt-1 text-2xl font-medium tracking-tight">{contrib.total.toLocaleString("en-US")}</dd>
              </div>
              <div>
                <dt className="text-xs text-subtle">Longest streak</dt>
                <dd className="mt-1 text-2xl font-medium tracking-tight">
                  {s.longest} <span className="text-sm text-muted">days</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-subtle">Busiest day</dt>
                <dd className="mt-1 text-2xl font-medium tracking-tight">
                  {s.busiest.count} <span className="text-sm text-muted">· {fmtDay(s.busiest.date)}</span>
                </dd>
              </div>
            </dl>

            <div
              className="gh-scroll mt-6 overflow-x-auto pb-2"
              dir="rtl"
              tabIndex={0}
              role="region"
              aria-label="Contribution calendar"
            >
              <div dir="ltr" className="gh-graph" role="img" aria-label={`${contrib.total} contributions in the last 12 months`}>
                <div className="gh-cols mb-1.5" style={cols} aria-hidden="true">
                  {weeks.map((w, i) => (
                    <span key={i} className="gh-month">
                      {i > 0 && monthOf(w) !== monthOf(weeks[i - 1]) ? monthOf(w) : ""}
                    </span>
                  ))}
                </div>
                <div className="gh-cols" style={cols} aria-hidden="true">
                  {weeks.map((w, i) => (
                    <div key={i} className="gh-week" style={{ "--w": i } as React.CSSProperties}>
                      {w.map((d, j) =>
                        d ? (
                          <span
                            key={d.date}
                            className="gh-cell"
                            data-l={d.level}
                            title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${fmtDay(d.date)}`}
                          />
                        ) : (
                          <span key={`pad-${j}`} />
                        ),
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 text-[0.6875rem] text-subtle">
              <span>Refreshed hourly from GitHub</span>
              <span className="flex items-center gap-1.5" aria-hidden="true">
                Less
                {[0, 1, 2, 3, 4].map((l) => (
                  <span key={l} className="gh-cell gh-key" data-l={l} />
                ))}
                More
              </span>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">
            The contribution graph couldn&apos;t be loaded right now.{" "}
            <a href={profileUrl} className="text-brand-text underline underline-offset-4">
              View it on GitHub
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
