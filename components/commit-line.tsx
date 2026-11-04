import { GITHUB_USER, getContributions } from "@/lib/github";

const W = 300;
const H = 52;

// Weekly GitHub contributions over the last year, drawn as a line.
export async function CommitLine() {
  const contrib = await getContributions();
  if (!contrib) return null;

  const weeks: number[] = [];
  for (let i = 0; i < contrib.days.length; i += 7) {
    weeks.push(contrib.days.slice(i, i + 7).reduce((sum, d) => sum + d.count, 0));
  }
  const max = Math.max(1, ...weeks);
  const pts = weeks.map((v, i) => [(i / (weeks.length - 1)) * W, H - 4 - (v / max) * (H - 10)]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  const peak = weeks.indexOf(max);

  return (
    <a
      href={`https://github.com/${GITHUB_USER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="commit-line group block"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="commit-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#commit-fill)" className="commit-area" />
        <path d={line} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" pathLength={1} className="commit-path" />
        <circle cx={pts[peak][0]} cy={pts[peak][1]} r="2.5" fill="currentColor" className="commit-dot" />
      </svg>
      <span className="mt-2 flex items-center justify-between font-mono text-[0.6875rem] text-subtle">
        <span>
          <span className="text-fg">{contrib.total}</span> contributions · last 12 mo
        </span>
        <span className="transition-colors group-hover:text-fg">github ↗</span>
      </span>
    </a>
  );
}
