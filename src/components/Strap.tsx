// Two branded straps crossing in an X — the EXTRON "X" itself — laid over the
// seam between two sections: one lime, one grey. The
// logo, "CLEAN ENERGY DRINK" and the slogan run along each like printed tape,
// and the two drift slowly in opposite directions.

type Paint = "black" | "white";

function Wordmark({ paint }: { paint: Paint }) {
  // The logo is three pieces (E · X · TRON); E and TRON are white artwork,
  // the X is lime. On the lime strap the whole mark is printed black.
  const letters = paint === "black" ? "brightness(0)" : "none";
  const x = paint === "black" ? "brightness(0)" : "none";
  return (
    <span className="flex h-[22px] shrink-0 items-center md:h-[28px]" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-e.png" alt="" className="h-full w-auto" style={{ filter: letters }} draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-x.png" alt="" className="h-full w-auto" style={{ filter: x }} draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-tron.png" alt="" className="h-full w-auto" style={{ filter: letters }} draggable={false} />
    </span>
  );
}

function Run({ paint, accent }: { paint: Paint; accent: string }) {
  const ink = paint === "black" ? "#05060a" : "#ececee";
  return (
    <div className="flex shrink-0 items-center gap-8 pe-8 md:gap-12 md:pe-12">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="flex shrink-0 items-center gap-8 md:gap-12">
          <Wordmark paint={paint} />
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
          <span
            className="space whitespace-nowrap text-[11px] font-bold tracking-[0.35em] md:text-[13px]"
            style={{ color: ink }}
          >
            CLEAN ENERGY DRINK
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
          <span
            dir="rtl"
            className="readex whitespace-nowrap text-[15px] font-bold leading-none md:text-[19px]"
            style={{ color: ink }}
          >
            طاقة من الطبيعة
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
        </div>
      ))}
    </div>
  );
}

// Both bands share the same run, size and speed; only the colour, tilt and
// drift direction differ. They cross off-centre, two thirds of the way across.
// The band is ltr so the run starts at its left end and always reaches past
// the screen's right edge, wherever the loop is.
function Band({
  down,
  reverse,
  bg,
  paint,
  accent,
}: {
  down?: boolean;
  reverse?: boolean;
  bg: string;
  paint: Paint;
  accent: string;
}) {
  return (
    <div
      dir="ltr"
      className={`${down ? "strap-down" : "strap-up"} absolute left-[68%] top-1/2 flex h-[52px] w-[200vw] -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:h-[68px]`}
      style={{ backgroundColor: bg }}
    >
      <div className={`strap-run flex w-max ${reverse ? "strap-run-back" : ""}`}>
        <Run paint={paint} accent={accent} />
        <Run paint={paint} accent={accent} />
      </div>
    </div>
  );
}

export default function Strap() {
  return (
    // Takes no room: a see-through box centred on the seam that clips the
    // bands' ends, so they never show and the page never scrolls sideways.
    <div data-strap className="pointer-events-none relative z-10 -my-[120px] h-[240px] overflow-hidden" aria-hidden="true">
      <Band down reverse bg="#3a3c42" paint="white" accent="var(--lime)" />
      <Band bg="var(--lime)" paint="black" accent="#05060a" />
    </div>
  );
}
