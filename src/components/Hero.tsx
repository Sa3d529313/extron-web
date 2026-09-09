"use client";

import Image from "@/components/Img";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const mobileSlides = [
  "/brand/hero-slide-1.png",
  "/brand/hero-slide-2.png",
  "/brand/hero-slide-3.png",
  "/brand/hero-slide-4.jpg",
  "/brand/hero-bg-mobile.png",
];

const SLIDE_DURATION = 4500;

function MobileHero() {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const touchRef = useRef<{ x: number; t: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    const next = ((idx % mobileSlides.length) + mobileSlides.length) % mobileSlides.length;
    setCurrent(next);
    setDragX(0);
    setDragging(false);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent(prev => (prev + 1) % mobileSlides.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, resetTimer]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, t: Date.now() };
    setDragging(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.touches[0].clientX - touchRef.current.x;
    setDragX(dx);
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dt = Date.now() - touchRef.current.t;
    const velocity = Math.abs(dx) / dt;
    if (Math.abs(dx) > 60 || velocity > 0.3) {
      goTo(current + (dx < 0 ? 1 : -1));
    } else {
      setDragX(0);
      setDragging(false);
    }
    touchRef.current = null;
    resetTimer();
  }, [current, goTo, resetTimer]);

  return (
    <section className="hero-mobile overflow-hidden bg-[#05060a] md:hidden">
      {/* Slide area — each slide is absolute, translated individually */}
      <div
        dir="ltr"
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 5", marginTop: "80px" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {mobileSlides.map((src, i) => {
          let diff = i - current;
          const n = mobileSlides.length;
          if (diff > n / 2) diff -= n;
          if (diff < -n / 2) diff += n;
          const offset = diff * 100;
          const isVisible = Math.abs(diff) <= 1;
          return (
            <div
              key={src}
              className="absolute inset-0"
              style={{
                transform: `translateX(calc(${offset}% + ${isVisible ? dragX : 0}px))`,
                transition: dragging || !isVisible ? "none" : "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                visibility: Math.abs(diff) > 1 ? "hidden" : "visible",
              }}
            >
              <Image
                src={src}
                alt={`EXTRON slide ${i + 1}`}
                fill
                priority
                sizes="100vw"
                className={i === mobileSlides.length - 1 ? "object-cover object-center" : "object-contain object-center"}
              />
            </div>
          );
        })}

        {/* Button overlaid ON the picture — near the bottom */}
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center px-6">
          <a
            href="#about"
            dir="rtl"
            className="hero-mobile-cta ar inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold text-[#05060a] shadow-lg transition-colors active:bg-gray-200"
          >
            <span>اعرف أكثر عن إكسترون</span>
            <span dir="ltr">→</span>
          </a>
        </div>
      </div>

      {/* Dots BELOW on light bg */}
      <div dir="ltr" className="flex justify-center gap-2 bg-[#eae7e1] py-4">
        {mobileSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-[7px] w-[7px] rounded-full transition-colors duration-300"
            style={{ backgroundColor: i === current ? "#05060a" : "rgba(5,6,10,0.2)" }}
          />
        ))}
      </div>
    </section>
  );
}

function DesktopHero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-ar-word", {
        y: 20, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.7,
      });
      gsap.from(".hero-cta", {
        y: 16, opacity: 0, duration: 0.8, ease: "power3.out", delay: 1.0,
      });
      gsap.from(".hero-bg-img", {
        scale: 1.08, opacity: 0, duration: 1.8, ease: "power3.out", delay: 0.2,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate hidden min-h-[100svh] flex-col overflow-hidden bg-[#05060a] pt-24 md:flex"
    >
      <div className="hero-bg-img pointer-events-none absolute inset-0">
        <Image
          src="/brand/hero-bg.png"
          alt="EXTRON product lineup"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(180deg, rgba(5,6,10,0.7) 0%, rgba(5,6,10,0.25) 18%, transparent 35%)",
              "linear-gradient(90deg, rgba(5,6,10,0.85) 0%, rgba(5,6,10,0.6) 30%, rgba(5,6,10,0.12) 50%, transparent 65%)",
              "linear-gradient(180deg, transparent 70%, rgba(5,6,10,0.95) 100%)",
            ].join(", "),
          }}
        />
      </div>

      <div
        dir="ltr"
        className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center pb-[12vh] px-10 lg:px-16"
      >
        <div className="max-w-xl">
          <h1 className="hero-headline ar-display text-left text-[clamp(36px,7vw,108px)] leading-[1.15]" dir="rtl">
            <span className="hero-ar-word block text-white">طاقة</span>
            <span className="hero-ar-word block text-[var(--lime)]" style={{ textShadow: "0 0 35px rgba(166,236,47,0.25)" }}>بلا حدود.</span>
          </h1>
          <div className="hero-cta mt-8 flex flex-row items-center gap-3">
            <a href="#products" dir="rtl"
              className="cta-lime group/cta inline-flex items-center justify-center gap-3 rounded-full bg-[var(--lime)] px-7 py-3.5 font-black text-black">
              <span className="relative ar text-base">استكشف التشكيلة</span>
              <span dir="ltr" className="relative transition-transform duration-300 group-hover/cta:-translate-x-1">←</span>
            </a>
            <a href="#about" dir="rtl" className="btn-outline ar text-sm">
              <span>اعرف أكثر عن إكسترون</span>
              <span dir="ltr">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <div id="top">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
