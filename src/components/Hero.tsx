"use client";

import Image from "@/components/Img";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const mobileSlides = [
  "/brand/12345.jpeg",
  "/brand/1234.jpeg",
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
      <div
        dir="ltr"
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 5", marginTop: "80px", touchAction: "pan-y pinch-zoom" }}
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
                className={src.endsWith(".jpeg") || src.endsWith(".jpg") || i === mobileSlides.length - 1 ? "object-cover object-center" : "object-contain object-center"}
              />
            </div>
          );
        })}

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

const DESKTOP_SLIDE_DURATION = 9000;

const desktopSlides = [
  {
    bg: "/brand/hero-bg-new.png",
    tagline: "/brand/clean-energy-tagline-clean.png",
    taglineAlt: "Clean Energy For A Brighter Tomorrow",
    headline: "/brand/hero-arabic-text.png",
    headlineAlt: "طاقة تصنع الفارق",
    ctaPrimary: { text: "استكشف التشكيلة", bg: "var(--lime)", color: "#000" },
    ctaSecondary: { text: "اعرف أكثر عن إكسترون" },
    decorative: "/brand/more-than-energy-clean.png",
    decorativeAlt: "More Than Energy",
  },
  {
    bg: "/brand/hero-bg-2.png",
    headline: "/brand/hero-text-2.png",
    headlineAlt: "انعاشك اليومي",
    headlineBlend: true,
    headlineMarginLeft: "-40px",
    ctaPrimary: { text: "استكشف التشكيلة", bg: "#e63946", color: "#fff" },
    ctaSecondary: { text: "اعرف أكثر عن إكسترون", borderColor: "rgba(230,57,70,0.5)", textColor: "#e63946" },
  },
];

function DesktopHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [bgIndex, setBgIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceSlide = useCallback((direction: number = 1) => {
    if (animating) return;
    setBgIndex(prev => {
      setPrevIndex(prev);
      setAnimating(true);
      setProgressKey(k => k + 1);
      return ((prev + direction) % desktopSlides.length + desktopSlides.length) % desktopSlides.length;
    });
    setTimeout(() => { setAnimating(false); setPrevIndex(null); }, 1500);
  }, [animating]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advanceSlide(1), DESKTOP_SLIDE_DURATION);
  }, [advanceSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-slide-content-0 .hero-el", {
        y: 20, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.7,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const gradientOverlay = [
    "linear-gradient(180deg, rgba(5,6,10,0.7) 0%, rgba(5,6,10,0.25) 18%, transparent 35%)",
    "linear-gradient(90deg, rgba(5,6,10,0.85) 0%, rgba(5,6,10,0.6) 30%, rgba(5,6,10,0.12) 50%, transparent 65%)",
    "linear-gradient(180deg, transparent 70%, rgba(5,6,10,0.95) 100%)",
  ].join(", ");

  const renderSlide = (slide: typeof desktopSlides[0], idx: number) => (
    <>
      {/* Background image */}
      <Image
        src={slide.bg}
        alt=""
        fill
        priority={idx === 0}
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Gradient overlay */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: gradientOverlay }} />

      {/* Content overlay */}
      <div
        dir="ltr"
        className={`hero-slide-content-${idx} absolute inset-0 flex items-center`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-10 pb-[12vh] lg:px-16">
          <div className="max-w-2xl">
            {slide.tagline && (
              <div className="hero-el mb-6">
                <Image
                  src={slide.tagline}
                  alt={slide.taglineAlt || ""}
                  width={2172}
                  height={724}
                  priority={idx === 0}
                  className="w-full max-w-md opacity-80"
                />
              </div>
            )}

            <div className="hero-el" style={{ marginLeft: slide.headlineMarginLeft || "-8px", mixBlendMode: slide.headlineBlend ? "screen" : undefined }}>
              <Image
                src={slide.headline}
                alt={slide.headlineAlt}
                width={1774}
                height={887}
                priority={idx === 0}
                className="w-full max-w-xl"
              />
            </div>

            <div className="hero-el mt-8 flex flex-row items-center gap-3">
              <a href="#products" dir="rtl"
                className="hero-cta-primary group/cta inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 font-black transition-shadow duration-500"
                style={{ backgroundColor: slide.ctaPrimary.bg, color: slide.ctaPrimary.color, "--glow": slide.ctaPrimary.bg } as React.CSSProperties}
              >
                <span className="relative ar text-base">{slide.ctaPrimary.text}</span>
                <span dir="ltr" className="relative transition-transform duration-300 group-hover/cta:-translate-x-1">←</span>
              </a>
              <a href="#about" dir="rtl"
                className="hero-cta-secondary group/sec ar inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition-all duration-500"
                style={{
                  borderColor: slide.ctaSecondary?.borderColor || "rgba(255,255,255,0.25)",
                  color: slide.ctaSecondary?.textColor || "#fff",
                  "--glow": slide.ctaSecondary?.textColor || "#fff",
                } as React.CSSProperties}
              >
                <span>{slide.ctaSecondary?.text || "اعرف أكثر عن إكسترون"}</span>
                <span dir="ltr" className="transition-transform duration-300 group-hover/sec:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-right decorative tagline */}
      {slide.decorative && (
        <div className="hero-el pointer-events-none absolute bottom-4 -right-16 lg:-right-20 lg:bottom-6">
          <Image
            src={slide.decorative}
            alt={slide.decorativeAlt || ""}
            width={2172}
            height={724}
            className="w-[420px] lg:w-[520px] opacity-70"
          />
        </div>
      )}
    </>
  );

  const dragRef = useRef<{ x: number; t: number } | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, t: Date.now() };
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dt = Date.now() - dragRef.current.t;
    const velocity = Math.abs(dx) / dt;
    if (Math.abs(dx) > 50 || velocity > 0.3) {
      advanceSlide(dx < 0 ? 1 : -1);
      resetTimer();
    }
    dragRef.current = null;
  }, [advanceSlide, resetTimer]);

  return (
    <section
      ref={rootRef}
      className="relative isolate hidden min-h-[100svh] flex-col overflow-hidden bg-[#05060a] pt-24 md:flex"
      style={{ cursor: "grab", touchAction: "pan-y pinch-zoom" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Outgoing slide — everything moves together */}
      {prevIndex !== null && (
        <div
          key={`out-${prevIndex}`}
          className="absolute inset-0"
          style={{
            animation: "heroSlideOut 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }}
        >
          {renderSlide(desktopSlides[prevIndex], prevIndex)}
        </div>
      )}

      {/* Current slide — everything enters together */}
      <div
        key={`in-${bgIndex}`}
        className="absolute inset-0"
        style={{
          animation: animating ? "heroSlideIn 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "none",
        }}
      >
        {renderSlide(desktopSlides[bgIndex], bgIndex)}
      </div>

      {/* Progress bar — stays fixed, doesn't move with slides */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2" dir="ltr">
        <div className="h-[3px] w-20 overflow-hidden rounded-full bg-white/20">
          <div
            key={progressKey}
            className="h-full rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.85)",
              animation: `heroProgress ${DESKTOP_SLIDE_DURATION}ms linear forwards`,
            }}
          />
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
