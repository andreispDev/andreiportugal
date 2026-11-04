"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

// Scroll-snap carousel: native swipe on touch, drag with the mouse, arrows and dots.
// Slides are server-rendered children.
export function Carousel({
  children,
  labels,
  icons,
}: {
  children: ReactNode;
  labels: string[];
  icons: { prev: ReactNode; next: ReactNode };
}) {
  const slides = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 1;
    return first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
  };

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: next * step(), behavior: "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(Math.round(el.scrollLeft / step())));
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    // Mouse drag (touch already swipes natively).
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "";
      const target = Math.round(el.scrollLeft / step());
      el.scrollTo({ left: target * step(), behavior: "smooth" });
      setTimeout(() => (el.style.scrollSnapType = ""), 400);
    };
    // A drag shouldn't also click a link inside the slide.
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", click, true);
    };
  }, []);

  const control =
    "grid size-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg disabled:pointer-events-none disabled:opacity-40";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects">
      <div
        ref={track}
        tabIndex={0}
        aria-label="Project slides, use arrow keys to move"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(active + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(active - 1);
          }
        }}
        className="carousel-track flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-xl"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${labels[i]}`}
            className="w-[88%] shrink-0 snap-start sm:w-[86%]"
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-mono text-xs text-subtle" aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${labels[i]}`}
              aria-current={i === active ? "true" : undefined}
              className="grid h-6 place-items-center px-0.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-fg" : "w-1.5 bg-line-strong hover:bg-subtle"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project" className={control}>
            {icons.prev}
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === slides.length - 1}
            aria-label="Next project"
            className={control}
          >
            {icons.next}
          </button>
        </div>
      </div>
    </div>
  );
}
