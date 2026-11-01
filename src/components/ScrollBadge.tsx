"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";

// Corner badge: the X inside a ring of text. Scrolling spins it with the
// scroll's speed (fast, then easing off) while the ring turns the other way.
// The X takes its colour from the section under it (data-badge="white");
// clicking goes back to the top. Desktop mouse only (see globals.css).
export default function ScrollBadge() {
  const badgeRef = useRef<HTMLButtonElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const badge = badgeRef.current!;
    const mark = markRef.current!;
    const ring = ringRef.current!;
    let angle = 0;
    let speed = 0;
    let lastTone = "";

    const tick = () => {
      // inertia towards the current scroll velocity, then friction lets it settle
      speed += (lenis.velocity - speed) * 0.08;
      angle += 0.08 + speed * 0.35;
      mark.style.transform = `rotate(${angle}deg)`;
      ring.style.transform = `rotate(${-angle * 0.6}deg)`;
    };
    const onScroll = () => {
      badge.classList.toggle("is-shown", lenis.scroll > 380);
      const r = badge.getBoundingClientRect();
      const under = document
        .elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
        .find((el) => !badge.contains(el) && el.closest("[data-badge]"));
      const tone = under?.closest("[data-badge]")?.getAttribute("data-badge") === "white" ? "light" : "";
      if (tone !== lastTone) { badge.dataset.tone = tone; lastTone = tone; }
    };

    gsap.ticker.add(tick);
    lenis.on("scroll", onScroll);
    onScroll();
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return (
    <button
      ref={badgeRef}
      type="button"
      className="scroll-badge"
      aria-label="العودة للأعلى"
      onClick={() => lenis?.scrollTo(0, { duration: 1.8 })}
    >
      <svg ref={ringRef} viewBox="-50 -50 100 100" aria-hidden="true" direction="ltr">
        <defs>
          <path id="badge-ring" d="M -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" />
        </defs>
        <text direction="ltr">
          <textPath href="#badge-ring" textLength="228" lengthAdjust="spacing">EXTRON · CLEAN ENERGY DRINK ·</textPath>
        </text>
      </svg>
      <div ref={markRef} className="scroll-badge-mark" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-x.png" alt="" />
      </div>
    </button>
  );
}
