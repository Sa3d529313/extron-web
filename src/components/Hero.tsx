"use client";

import Image from "@/components/Img";
import { useEffect, useRef, useState, useCallback } from "react";

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
            href="/about"
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
    banner: "/brand/banners/energy-duo.jpg",
    alt: "مشروبات الطاقة — طاقة من الطبيعة",
    ctaPrimary: { text: "استكشف التشكيلة", bg: "var(--lime)", color: "#000" },
    ctaSecondary: { text: "اعرف أكثر عن إكسترون" },
  },
  {
    banner: "/brand/banners/soda-trio.jpg",
    alt: "المشروبات الغازية — انتعاش لكل الأذواق",
    ctaPrimary: { text: "استكشف التشكيلة", bg: "#e63946", color: "#fff" },
    ctaSecondary: { text: "اعرف أكثر عن إكسترون", borderColor: "rgba(230,57,70,0.5)", textColor: "#e63946" },
  },
];

// Banner artwork is 1774×887 (2:1). It is shown whole — never cropped.
const BANNER_RATIO = 1774 / 887;

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
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const renderSlide = (slide: typeof desktopSlides[0], idx: number) => (
    <Image
      src={slide.banner}
      alt={slide.alt}
      fill
      priority={idx === 0}
      sizes="100vw"
      className="object-contain object-center"
    />
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

  const slide = desktopSlides[bgIndex];

  return (
    <section
      ref={rootRef}
      className="relative isolate hidden flex-col items-center overflow-hidden bg-[#05060a] pt-24 md:flex"
      style={{ cursor: "grab", touchAction: "pan-y pinch-zoom" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Banner stage: full width, but no taller than the screen allows, so the artwork always shows in full */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: `calc((100svh - 190px) * ${BANNER_RATIO})`,
          minWidth: "min(100%, 720px)",
          aspectRatio: String(BANNER_RATIO),
        }}
      >
        {/* Outgoing slide */}
        {prevIndex !== null && (
          <div
            key={`out-${prevIndex}`}
            className="absolute inset-0"
            style={{ animation: "heroSlideOut 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards" }}
          >
            {renderSlide(desktopSlides[prevIndex], prevIndex)}
          </div>
        )}

        {/* Current slide */}
        <div
          key={`in-${bgIndex}`}
          className={`hero-slide-content-${bgIndex} absolute inset-0`}
          style={{ animation: animating ? "heroSlideIn 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "none" }}
        >
          {renderSlide(slide, bgIndex)}
        </div>
      </div>

      {/* Buttons + progress, below the banner so they never cover it */}
      <div className="flex w-full flex-col items-center gap-4 py-5" dir="ltr">
        <div className="flex flex-row items-center gap-3">
          <a href="/products" dir="rtl"
            className="hero-cta-primary group/cta inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 font-black transition-shadow duration-500"
            style={{ backgroundColor: slide.ctaPrimary.bg, color: slide.ctaPrimary.color, "--glow": slide.ctaPrimary.bg } as React.CSSProperties}
          >
            <span className="relative ar text-base">{slide.ctaPrimary.text}</span>
            <span dir="ltr" className="relative transition-transform duration-300 group-hover/cta:-translate-x-1">←</span>
          </a>
          <a href="/about" dir="rtl"
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
