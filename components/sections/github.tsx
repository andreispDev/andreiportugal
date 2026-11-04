import { BrandIcon, Icon } from "@/components/icon";
import { GITHUB_USER, getContributions, getRecentCommits, type Day } from "@/lib/github";

const fmtDay = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const fmtPush = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "Asia/Manila" });

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
  const [contrib, commits] = await Promise.all([getContributions(), getRecentCommits()]);
  const profileUrl = `https://github.com/${GITHUB_USER}`;
  const weeks = contrib ? toWeeks(contrib.days) : [];
  const s = contrib ? stats(contrib.days) : null;

  return (
    <section id="activity" aria-labelledby="activity-title" className="container-x py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
        <div className="max-w-xl">
          <p className="eyebrow">
            <Icon name="git-branch-bold-duotone" /> GitHub
          </p>
          <h2 id="activity-title" className="mt-3 text-3xl font-medium tracking-[-0.025em] md:text-[2.5rem] md:leading-[1.1]">
            Commits, not just claims.
          </h2>
          <p className="mt-4 text-muted">My contribution graph and latest public pushes, refreshed hourly.</p>
        </div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <BrandIcon name="github" className="size-4 text-fg!" /> @{GITHUB_USER}
        </a>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_22rem] [&>*]:min-w-0">
        <div className="card p-5 md:p-6" data-reveal>
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
                    {s.busiest.count} <span className="text-sm text-muted">on {fmtDay(s.busiest.date)}</span>
                  </dd>
                </div>
              </dl>

              <div
                className="gh-scroll mt-6 overflow-x-auto pb-2"
                dir="rtl"
                tabIndex={0}
                role="region"
                aria-label="Contribution calendar, scrollable"
              >
                <div dir="ltr" className="w-max" role="img" aria-label={`${contrib.total} contributions in the last 12 months`}>
                  <div className="gh-weeks mb-1.5" aria-hidden="true">
                    {weeks.map((w, i) => {
                      const m = monthOf(w);
                      return (
                        <span key={i} className="gh-month">
                          {i > 0 && m !== monthOf(weeks[i - 1]) ? m : ""}
                        </span>
                      );
                    })}
                  </div>
                  <div className="gh-weeks" aria-hidden="true">
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

              <div className="mt-3 flex items-center justify-end gap-1.5 text-[0.6875rem] text-subtle" aria-hidden="true">
                Less
                {[0, 1, 2, 3, 4].map((l) => (
                  <span key={l} className="gh-cell" data-l={l} />
                ))}
                More
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

        <div className="card flex flex-col p-5 md:p-6" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <h3 className="flex items-center gap-2 text-sm text-muted">
            <Icon name="history-bold-duotone" className="size-4 text-brand-text" /> Latest pushes
          </h3>
          {commits.length ? (
            <ol className="mt-4 space-y-3">
              {commits.map((c) => (
                <li key={c.sha + c.date}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block rounded-md">
                    <p className="truncate text-sm text-fg group-hover:text-brand-text">{c.message}</p>
                    <p className="mt-0.5 flex gap-2 font-mono text-[0.6875rem] text-subtle">
                      <span className="text-brand-text">{c.sha}</span>
                      <span className="truncate">{c.repo}</span>
                      <span className="ml-auto shrink-0">{fmtPush(c.date)}</span>
                    </p>
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-sm text-muted">No recent public pushes.</p>
          )}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-muted hover:text-fg"
          >
            All activity <Icon name="arrow-right-up-linear" className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
