"use client";

import { useEffect } from "react";

// One place for page-wide effects: scroll reveal, card spotlight and timeline progress.
// Renders nothing; everything is driven by data attributes in server-rendered markup.
export function Interactions() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-shown", "");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    const onPointer = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });

    const timeline = document.querySelector<HTMLElement>("[data-timeline]");
    const items = timeline ? Array.from(timeline.querySelectorAll<HTMLElement>("[data-tl-item]")) : [];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!timeline) return;
      const r = timeline.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
      timeline.style.setProperty("--p", p.toFixed(4));
      for (const item of items) {
        const top = item.getBoundingClientRect().top;
        item.toggleAttribute("data-passed", top < anchor);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (timeline) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      reveal.disconnect();
      document.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
