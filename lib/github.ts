import { cacheLife } from "next/cache";

export const GITHUB_USER = "andreispDev";

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Commit = { repo: string; message: string; sha: string; url: string; date: string };

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "portfolio-site",
  // Optional: raises GitHub's anonymous limit of 60 requests/hour.
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

// Daily contribution counts for the last year (public profile data, no key needed).
export async function getContributions(): Promise<{ total: number; days: Day[] } | null> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { total: { lastYear: number }; contributions: Day[] };
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

// Latest public pushes. Push events no longer carry commit lists, so each head
// commit is looked up for its message.
export async function getRecentCommits(limit = 5): Promise<Commit[]> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const events = (await res.json()) as {
      type: string;
      repo: { name: string };
      created_at: string;
      payload: { head?: string };
    }[];
    const pushes = events.filter((e) => e.type === "PushEvent" && e.payload.head).slice(0, limit);
    const commits = await Promise.all(
      pushes.map(async (e): Promise<Commit | null> => {
        const r = await fetch(`https://api.github.com/repos/${e.repo.name}/commits/${e.payload.head}`, {
          headers,
          signal: AbortSignal.timeout(8000),
        });
        if (!r.ok) return null;
        const c = (await r.json()) as { sha: string; html_url: string; commit: { message: string } };
        return {
          repo: e.repo.name.split("/")[1] ?? e.repo.name,
          message: c.commit.message.split("\n")[0],
          sha: c.sha.slice(0, 7),
          url: c.html_url,
          date: e.created_at,
        };
      }),
    );
    return commits.filter((c): c is Commit => c !== null);
  } catch {
    return [];
  }
}
