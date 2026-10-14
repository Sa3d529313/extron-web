import type { PointType } from "@/data/sellingPoints";

// 24×24 stroke icons. Kept as path data so Leaflet pins (HTML strings) and
// React components draw the exact same shapes.
const TYPE_PATHS: Record<PointType, string[]> = {
  supermarket: [
    "M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 8H6",
    "M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    "M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  ],
  cafe: [
    "M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z",
    "M16 10h1.5a2.5 2.5 0 0 1 0 5H16",
    "M8 3v3",
    "M12 3v3",
  ],
  restaurant: [
    "M5 3v7a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V3",
    "M7.5 3v18",
    "M19 15V3a4 4 0 0 0-4 4v6a2 2 0 0 0 2 2h2Zm0 0v6",
  ],
  roastery: [
    "M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.8 1.2 2.8 2.3 3.2C11 8.5 11 5.5 12 3Z",
  ],
  bakery: [
    "M5 11a4 4 0 0 1 3-7h8a4 4 0 0 1 3 7v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8Z",
    "M9 9v2",
    "M15 9v2",
  ],
  gym: ["M6 7v10", "M18 7v10", "M3 9.5v5", "M21 9.5v5", "M6 12h12"],
  other: [
    "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z",
    "M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  ],
};

const UI_PATHS = {
  pin: TYPE_PATHS.other,
  locate: ["M12 2v3", "M12 19v3", "M2 12h3", "M19 12h3", "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"],
  phone: [
    "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  ],
  directions: ["M3 11 21 3l-8 18-2-8-8-2Z"],
  close: ["M6 6l12 12", "M18 6 6 18"],
  chevron: ["M15 6l-6 6 6 6"],
  grid: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"],
} as const;

export type UiIconName = keyof typeof UI_PATHS;

function Svg({ paths, className }: { paths: readonly string[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function TypeIcon({ type, className }: { type: PointType; className?: string }) {
  return <Svg paths={TYPE_PATHS[type]} className={className} />;
}

export function UiIcon({ name, className }: { name: UiIconName; className?: string }) {
  return <Svg paths={UI_PATHS[name]} className={className} />;
}

/** Same icon as a raw SVG string, for Leaflet divIcons. */
export function typeIconSvg(type: PointType): string {
  const paths = TYPE_PATHS[type].map((d) => `<path d="${d}"/>`).join("");
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}
