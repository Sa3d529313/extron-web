"use client";

import { CITIES, SELLING_POINTS } from "@/data/sellingPoints";
import Reveal, { Line } from "@/components/Reveal";
import BrandWord from "@/components/BrandWord";

// Two glass panels: where to buy (real counts from the selling-points data)
// and an invitation to shops and distributors. A soft light follows the pointer.
const perks = ["منتج مطلوب", "هوامش ربح تنافسية", "دعم تسويقي كامل", "توصيل منتظم"];

function followLight(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function HomeFind() {
  const cityCounts = CITIES.map((c) => ({
    name: c.name,
    count: SELLING_POINTS.filter((p) => p.cityId === c.id).length,
  }));

  return (
    <section className="relative bg-[var(--bg)] pb-24 md:pb-40" dir="rtl">
      <div className="mx-auto grid max-w-[1500px] gap-5 px-5 md:grid-cols-2 md:gap-6 md:px-10">
        {/* Selling points */}
        <Reveal as="a" href="/selling-points" onPointerMove={followLight} className="glass-panel group flex flex-col justify-between gap-12 p-7 md:min-h-[460px] md:p-12">
          <div>
            <p className="fade-up readex mb-5 text-sm text-[var(--lime)]">نقاط البيع</p>
            <h2 className="readex text-[10vw] font-extralight leading-[1.05] text-white md:text-[3.6vw]">
              <Line>لاقي <BrandWord /></Line>
              <Line><span className="font-medium text-[var(--lime)]">قريب منك.</span></Line>
            </h2>
          </div>
          <div className="fade-up d1">
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="readex text-6xl font-extralight text-white md:text-7xl" dir="ltr">{SELLING_POINTS.length}</p>
                <p className="ar mt-1 text-sm text-white/55">نقطة بيع</p>
              </div>
              {cityCounts.map((c) => (
                <div key={c.name}>
                  <p className="readex text-6xl font-extralight text-white/40 md:text-7xl" dir="ltr">{c.count}</p>
                  <p className="ar mt-1 text-sm text-white/55">{c.name}</p>
                </div>
              ))}
            </div>
            <span className="readex mt-10 inline-flex items-center gap-3 text-base text-white transition-colors group-hover:text-[var(--lime)]">
              افتح الخريطة
              <span dir="ltr" className="transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:-translate-x-2">←</span>
            </span>
          </div>
        </Reveal>

        {/* Shops & distributors */}
        <Reveal as="a" href="/distributors" onPointerMove={followLight} className="glass-panel group flex flex-col justify-between gap-12 p-7 md:min-h-[460px] md:p-12">
          <div>
            <p className="fade-up readex mb-5 text-sm text-[var(--lime)]">للتجار</p>
            <h2 className="readex text-[10vw] font-extralight leading-[1.05] text-white md:text-[3.6vw]">
              <Line>اشتغل</Line>
              <Line><span className="font-medium text-[var(--lime)]">معنا.</span></Line>
            </h2>
            <p className="fade-up d1 ar mt-6 max-w-md text-base leading-[1.9] text-white/65">
              سواء كنت صاحب سوبرماركت، كافيه، أو مطعم — <BrandWord className="mx-1" /> علامة جاهزة تعطيك
              منتج قوي وطلب حقيقي من الزبائن.
            </p>
          </div>
          <div className="fade-up d2">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {perks.map((perk) => (
                <li key={perk} className="ar flex items-center gap-3 text-[15px] text-white/80">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lime)]" />
                  {perk}
                </li>
              ))}
            </ul>
            <span className="readex mt-10 inline-flex items-center gap-3 text-base text-white transition-colors group-hover:text-[var(--lime)]">
              تواصل معنا
              <span dir="ltr" className="transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:-translate-x-2">←</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
