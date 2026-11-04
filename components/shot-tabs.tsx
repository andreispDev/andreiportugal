"use client";

import { useId, useState, type ReactNode } from "react";

type Shot = { id: string; label: string; url: string; image: ReactNode };

// Browser-framed screenshot switcher. Images are rendered on the server and passed in.
export function ShotTabs({ shots }: { shots: Shot[] }) {
  const [active, setActive] = useState(shots[0].id);
  const base = useId();
  const current = shots.find((s) => s.id === active)!;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow)]">
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="hidden min-w-0 flex-1 truncate rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[0.6875rem] text-subtle sm:block">
          {current.url}
        </span>
        <div role="tablist" aria-label="Screens" className="ml-auto flex gap-1">
          {shots.map((s) => (
            <button
              key={s.id}
              id={`${base}-tab-${s.id}`}
              type="button"
              role="tab"
              aria-selected={s.id === active}
              aria-controls={`${base}-panel-${s.id}`}
              onClick={() => setActive(s.id)}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                s.id === active ? "bg-surface text-fg shadow-sm ring-1 ring-line" : "text-muted hover:text-fg"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {shots.map((s) => (
        <div
          key={s.id}
          id={`${base}-panel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${s.id}`}
          hidden={s.id !== active}
        >
          {s.image}
        </div>
      ))}
    </div>
  );
}
