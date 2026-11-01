"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";

// Home intro: the logo assembles (E · X · TRON) while a counter runs to 100,
// the X turns, then the whole mark flies into the header logo's exact spot
// while the curtain lifts. Plays once per session; the boot script in the
// layout decides (html[data-intro="play"]), so nothing flashes on first paint.
const EASE = "expo.out";

export default function Intro() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const lenis = useLenis();
  const started = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") { setGone(true); return; }
    if (!lenis || started.current) return;
    started.current = true;

    const curtain = curtainRef.current!;
    const mark = markRef.current!;
    const pieces = mark.querySelectorAll<HTMLElement>(".intro-piece");
    const x = mark.querySelector<HTMLElement>(".intro-piece-x")!;
    curtain.style.animation = "none";
    mark.style.animation = "none";
    try { sessionStorage.setItem("extron-intro", "1"); } catch {}

    lenis.stop();
    root.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.to(pieces, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: EASE, stagger: 0.14 }, 0.15)
      .to(counter, {
        v: 100,
        duration: 1.7,
        ease: "power2.inOut",
        onUpdate: () => { if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)); },
      }, 0.1)
      .to(x, { rotation: 360, duration: 0.9, ease: "power3.inOut" }, 1.55)
      .add(() => {
        // Measure both logos now, so the flight lands exactly on the header's.
        const target = document.getElementById("nav-logo");
        const from = mark.getBoundingClientRect();
        if (target) {
          const to = target.getBoundingClientRect();
          gsap.to(mark, {
            x: to.left + to.width / 2 - (from.left + from.width / 2),
            y: to.top + to.height / 2 - (from.top + from.height / 2),
            scale: to.height / from.height,
            duration: 1.15,
            ease: EASE,
            onComplete: finish,
          });
        } else {
          gsap.to(mark, { opacity: 0, duration: 0.5, onComplete: finish });
        }
        gsap.to(curtain, { yPercent: -100, duration: 1.2, ease: "expo.inOut" });
        root.classList.add("intro-lifting");
      }, 2.35);

    function finish() {
      root.classList.add("intro-done");
      root.style.overflow = "";
      lenis?.start();
      requestAnimationFrame(() => setGone(true));
    }
    // No cleanup: the intro always runs to the end (and React's dev double-run
    // must not kill it halfway).
  }, [lenis]);

  if (gone) return null;

  return (
    <div className="intro-root" aria-hidden="true">
      <div ref={curtainRef} className="intro-curtain">
        <div className="intro-count">
          <span ref={countRef}>0</span>
        </div>
      </div>
      <div ref={markRef} className="intro-mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-e.png" alt="" className="intro-piece" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-x.png" alt="" className="intro-piece intro-piece-x" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-tron.png" alt="" className="intro-piece" />
      </div>
    </div>
  );
}
