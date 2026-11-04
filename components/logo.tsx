// "a|p" ligature: the a-bowl and p-bowl share one stem, which ends in a commit
// node — the same node used on the career graph.
export function LogoMark({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="7.4" cy="10.4" r="3.6" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="16.6" cy="10.4" r="3.6" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 6.8v10.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="19.6" r="2" fill="currentColor" />
    </svg>
  );
}

export function Logo({ size = "size-7" }: { size?: string }) {
  return (
    <span
      className={`${size} grid shrink-0 place-items-center rounded-[28%] bg-brand text-on-brand shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_0_0_1px_rgb(0_0_0/0.06)]`}
      aria-hidden="true"
    >
      <LogoMark className="size-[62%]" />
    </span>
  );
}
