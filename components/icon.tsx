import { brandHex, type BrandIconName, type SolarIconName } from "@/lib/icons.generated";

// Icons are <use> references into the cached /icons.svg sprite, so their paths
// never inflate the HTML or the RSC payload.
const SPRITE = "/icons.svg";

type IconProps = {
  name: SolarIconName;
  className?: string;
  label?: string;
};

export function Icon({ name, className = "size-4", label }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <use href={`${SPRITE}#${name}`} />
    </svg>
  );
}

// Brands whose official colour is too dark to read on the dark theme.
const INK = new Set(["000000", "010101", "0A0A0A", "181717"]);

export function BrandIcon({ name, className = "size-6" }: { name: BrandIconName; className?: string }) {
  const hex = brandHex[name];
  return (
    <svg
      viewBox="0 0 24 24"
      className={`logo ${className}`}
      style={INK.has(hex.toUpperCase()) ? undefined : ({ "--logo": `#${hex}` } as React.CSSProperties)}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`${SPRITE}#b-${name}`} />
    </svg>
  );
}
