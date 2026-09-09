"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { num: "108", unit: "mg", ar: "كافيين طبيعي", en: "Natural Caffeine" },
  { num: "0", unit: "g", ar: "سكر مضاف", en: "Added Sugar" },
  { num: "5", unit: "", ar: "نكهات مميزة", en: "Distinct Flavors" },
  { num: "100", unit: "%", ar: "مصادر طبيعية", en: "Natural Sources" },
];

const pillars = [
  {
    ar: "بلا اصطناع",
    en: "Clean Formula",
    arDesc: "بدون مواد حافظة. بدون ألوان اصطناعية. نكهة حقيقية من مكونات حقيقية.",
    enDesc: "No preservatives. No artificial colors.",
  },
  {
    ar: "طاقة حقيقية",
    en: "Real Energy",
    arDesc: "كافيين نباتي، توراين، جينسنغ وغوارانا — طاقة تدوم بدون انهيار.",
    enDesc: "Plant caffeine, taurine, ginseng & guarana.",
  },
  {
    ar: "لكل الأذواق",
    en: "Made For All",
    arDesc: "خمس نكهات متنوعة — من مشروب الطاقة النظيف للصودا والكولا.",
    enDesc: "Five flavors across the full lineup.",
  },
];

export default function Ingredients() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".count-num").forEach((el) => {
        const end = Number(el.dataset.end || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });

      gsap.from(".pillar", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pillars", start: "top 90%" },
      });
    }, ref);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ingredients"
      ref={ref}
      className="metal-sheen relative overflow-hidden pt-12 pb-0 md:pt-24 md:pb-6"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        {/* Header — Arabic primary */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
            <span className="h-px w-8 bg-[var(--lime)]" />
            المكونات · What's Inside
          </p>
          <h2 className="ar-display text-[12vw] leading-[0.9] text-white md:text-[5.5vw]">
            المكونات <span className="text-[var(--lime)]">تحكي.</span>
          </h2>
          <p className="display mt-2 text-lg text-white/25 md:text-xl">
            THE INGREDIENTS TALK.
          </p>
          <p className="ar mt-6 max-w-xl text-lg leading-relaxed text-white/60" dir="rtl">
            طاقة حقيقية من مصادر حقيقية. كل مكوّن مختار بعناية — بدون حشو، بدون مفاجآت.
          </p>
        </div>

        {/* Stat grid */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s) => (
            <div
              key={s.en}
              className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 md:p-8"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--lime)]/10 blur-2xl transition-all group-hover:bg-[var(--lime)]/30" />
              <div className="relative">
                <p className="display flex items-baseline gap-1 text-[var(--lime)]">
                  <span
                    className="count-num text-6xl md:text-7xl"
                    data-end={s.num}
                  >
                    0
                  </span>
                  {s.unit && (
                    <span className="text-xl text-white/50">{s.unit}</span>
                  )}
                </p>
                <p className="ar mt-3 text-sm font-bold text-white" dir="rtl">
                  {s.ar}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                  {s.en}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pillars — Arabic primary */}
        <div className="pillars grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.en}
              className="pillar relative overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8"
            >
              <p className="display mb-6 text-6xl text-white/10">0{i + 1}</p>
              <p className="ar-display text-3xl text-white md:text-4xl">
                {p.ar}
              </p>
              <p className="display mt-1 text-sm text-[var(--lime)] uppercase">
                {p.en}
              </p>
              <p className="ar mt-5 text-sm leading-relaxed text-white/60" dir="rtl">
                {p.arDesc}
              </p>
              <p className="mt-2 text-[11px] text-white/30">
                {p.enDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
