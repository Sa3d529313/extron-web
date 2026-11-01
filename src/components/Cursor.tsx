"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Mouse devices only: a small dot exactly at the pointer and a thin ring that
// trails it. Over anything clickable the ring opens up and the dot shrinks.
const CLICKABLE = "a, button, [role='button'], label, select, summary, input[type='submit'], .leaflet-marker-icon";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const root = document.documentElement;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    root.classList.add("has-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!root.classList.contains("cursor-visible")) {
        // first move: jump straight there instead of sliding in from the corner
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        root.classList.add("cursor-visible");
      }
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
      const overLink = e.target instanceof Element && !!e.target.closest(CLICKABLE);
      root.classList.toggle("cursor-link", overLink);
    };
    const onLeave = () => root.classList.remove("cursor-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      root.classList.remove("has-cursor", "cursor-visible", "cursor-link");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"><span /></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true"><span /></div>
    </>
  );
}
