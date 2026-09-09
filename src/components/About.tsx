"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const values = [
  { en: "Quality First", ar: "الجودة أولاً" },
  { en: "Clean Ingredients", ar: "مكونات نظيفة" },
  { en: "Global Standards", ar: "معايير عالمية" },
];

export default function About() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".abt-reveal", {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="metal-sheen relative overflow-hidden py-16 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(166,236,47,0.4), transparent 65%)",
        }}
      />

      {/* Header — centered, Arabic primary */}
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
        <p className="abt-reveal mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
          <span className="h-px w-8 bg-[var(--lime)]" />
          عن الشركة · About EXTRON
          <span className="h-px w-8 bg-[var(--lime)]" />
        </p>
        <h2 className="abt-reveal ar-display text-[11vw] leading-[0.9] text-white md:text-[6vw]">
          صُنعت <span className="text-[var(--lime)]">هنا.</span>
        </h2>
        <p className="abt-reveal display mt-3 text-xl text-white/25 md:text-2xl">
          BUILT HERE.
        </p>

        <p className="abt-reveal ar mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
          إكسترون علامة فلسطينية جديدة أُطلقت لتغيّر مفهوم مشروبات الطاقة في
          المنطقة. تجربة نظيفة، حقيقية، بمعايير عالمية.
        </p>
      </div>

      {/* PHOTO GALLERY — tight mosaic, thin gaps only */}
      <div className="mx-auto mt-16 max-w-[1600px] px-4 md:mt-24 md:px-8">
        {/* Row 1: 3 photos, varied aspect ratios */}
        <div className="abt-reveal grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-1.5">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/lifestyle/pic1.jpg"
              alt="EXTRON products on ice"
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/lifestyle/pic4.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/lifestyle/pic5.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/lifestyle/pic2.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/lifestyle/pic3.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/lifestyle/pic6.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* VALUES — Arabic primary */}
      <div className="mx-auto mt-20 max-w-5xl px-6 md:px-12">
        <p className="abt-reveal mb-6 text-center text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
          قيمنا · What We Stand For
        </p>
        <div className="abt-reveal grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {values.map((v) => (
            <div
              key={v.en}
              className="group border border-white/10 bg-white/[0.02] p-5 text-center transition-colors hover:border-[var(--lime)]/40"
            >
              <p className="ar-display text-xl text-[var(--lime)] md:text-2xl">
                {v.ar}
              </p>
              <p className="display mt-2 text-xs text-white/30 uppercase">
                {v.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
