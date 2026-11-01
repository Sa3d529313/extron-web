// "EXTRON" in running text, always set like the logo: the real wordmark pieces
// (E · X · TRON) sized to the surrounding text. `ink="dark"` prints the
// letters black for light backgrounds; the X keeps its lime.
export default function BrandWord({ ink = "light", className = "" }: { ink?: "light" | "dark"; className?: string }) {
  const letters = ink === "dark" ? { filter: "brightness(0)" } : undefined;
  return (
    <span
      role="img"
      aria-label="EXTRON"
      dir="ltr"
      // the logo artwork has room above and below the letters, so the box is
      // taller than the text to make the letters match its cap height
      className={`inline-flex h-[1.25em] items-center align-[-0.32em] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-e.png" alt="" className="h-full w-auto" style={letters} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-x.png" alt="" className="h-full w-auto" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-tron.png" alt="" className="h-full w-auto" style={letters} />
    </span>
  );
}
