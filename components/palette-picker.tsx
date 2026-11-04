"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

// Swatch = the ramp's 300 and 800 steps (see the palette blocks in globals.css).
export const PALETTES = [
  { id: "stone", label: "Stone", light: "#d6d3d1", dark: "#292524" },
  { id: "zinc", label: "Zinc", light: "#d4d4d8", dark: "#27272a" },
  { id: "slate", label: "Slate", light: "#cbd5e1", dark: "#1e293b" },
  { id: "sage", label: "Sage", light: "#c2cbbd", dark: "#2c332a" },
  { id: "mocha", label: "Mocha", light: "#d4c3ad", dark: "#362a20" },
] as const;

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-palette"] });
  return () => mo.disconnect();
}
const getPalette = () => document.documentElement.dataset.palette ?? "stone";

function applyPalette(id: string) {
  const html = document.documentElement;
  html.classList.add("theme-switching");
  if (id === "stone") delete html.dataset.palette;
  else html.dataset.palette = id;
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove("theme-switching")));
  try {
    localStorage.setItem("palette", id);
  } catch {}
}

export function PalettePicker({ icon, className }: { icon: ReactNode; className: string }) {
  const palette = useSyncExternalStore(subscribe, getPalette, () => "stone");
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="palette-menu"
        aria-label="Choose color theme"
        title="Color theme"
        className={className}
      >
        {icon}
      </button>
      <div
        id="palette-menu"
        role="radiogroup"
        aria-label="Color theme"
        hidden={!open}
        className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-line bg-surface p-1.5 shadow-[var(--shadow)]"
      >
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={palette === p.id}
            onClick={() => applyPalette(p.id)}
            className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface-2 ${
              palette === p.id ? "bg-surface-2 text-fg" : "text-muted"
            }`}
          >
            <span className="flex" aria-hidden="true">
              <span className="size-4 rounded-full border border-line" style={{ background: p.light }} />
              <span className="-ml-1.5 size-4 rounded-full border border-line" style={{ background: p.dark }} />
            </span>
            {p.label}
            {palette === p.id && <span className="ml-auto size-1.5 rounded-full bg-fg" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}
