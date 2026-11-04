"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { PalettePicker } from "./palette-picker";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#activity", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

type Icons = Record<
  | "logo"
  | "sun"
  | "moon"
  | "compact"
  | "comfortable"
  | "menu"
  | "close"
  | "palette",
  ReactNode
>;

function flip(apply: () => void) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  apply();
  // Two frames: let the new styles paint before transitions come back.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("theme-switching")),
  );
}

// <html> data attributes are the source of truth (set before paint by the boot script).
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-density"],
  });
  return () => mo.disconnect();
}
const getTheme = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const getDensity = () =>
  document.documentElement.dataset.density === "comfortable"
    ? "comfortable"
    : "compact";

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function SiteHeader({ icons }: { icons: Icons }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");
  const density = useSyncExternalStore(subscribe, getDensity, () => "compact");
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    flip(() => (document.documentElement.dataset.theme = next));
    save("theme", next);
  };

  const toggleDensity = () => {
    const next = density === "compact" ? "comfortable" : "compact";
    const root = document.documentElement;
    if (next === "comfortable") root.dataset.density = next;
    else delete root.dataset.density;
    save("density", next);
  };

  const control =
    "inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-bg/80 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <div className="container-x flex h-14 items-center gap-6">
        <a
          href="#top"
          aria-label="Andrei Portugal, back to top"
          className="flex items-center gap-2 font-medium tracking-tight"
        >
          {icons.logo}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  aria-current={active === n.href ? "true" : undefined}
                  className={`rounded-md px-2.5 py-1.5 transition-colors hover:text-fg ${
                    active === n.href ? "text-fg" : "text-muted"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDensity}
            className={`${control} hidden sm:inline-flex`}
            aria-label={
              density === "compact"
                ? "Switch to comfortable size"
                : "Switch to compact size"
            }
            title={density === "compact" ? "Comfortable size" : "Compact size"}
          >
            {density === "compact" ? icons.comfortable : icons.compact}
          </button>
          <PalettePicker icon={icons.palette} className={control} />
          <button
            type="button"
            onClick={toggleTheme}
            className={control}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            {theme === "dark" ? icons.sun : icons.moon}
          </button>
          <a
            href="/resume/Ronald-Andrei-Portugal-Resume.pdf"
            download
            className="btn btn-primary hidden h-8 sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            className={`${control} md:hidden`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? icons.close : icons.menu}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="container-x border-t border-line pb-4 md:hidden"
      >
        <ul className="grid gap-1 pt-3">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-[0.95rem] text-muted hover:bg-surface hover:text-fg"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2 px-1">
          <button
            type="button"
            onClick={toggleDensity}
            className="btn btn-ghost flex-1"
          >
            {density === "compact" ? "Comfortable size" : "Compact size"}
          </button>
          <a
            href="/resume/Ronald-Andrei-Portugal-Resume.pdf"
            download
            className="btn btn-primary flex-1"
          >
            Download resume
          </a>
        </div>
      </nav>
    </header>
  );
}
