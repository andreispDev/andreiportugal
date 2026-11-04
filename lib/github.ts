import { cacheLife } from "next/cache";

export const GITHUB_USER = "andreispDev";

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

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
