"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { products } from "@/data/products";
import Reveal, { Line } from "@/components/Reveal";
import BrandWord from "@/components/BrandWord";

// The five drinks as tall rows. On a mouse, a soft lime light follows the
// pointer across the row and the drink's can floats beside the cursor.
// Latin names as the company writes them (EXTRON itself is set as the wordmark).
const latin: Record<string, { brand?: boolean; name: string }> = {
  "extron-green": { brand: true, name: "Original" },
  "extron-pink": { brand: true, name: "For Women" },
  "cola-nova": { name: "Cola Nova" },
  "for-us": { name: "FOR US Orange" },
  fizo: { name: "Fizo Gazoz" },
};

export default function HomeRange() {
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const float = floatRef.current!;
    const fx = gsap.quickTo(float, "x", { duration: 0.7, ease: "power3.out" });
    const fy = gsap.quickTo(float, "y", { duration: 0.7, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      // sit to the left of the pointer, vertically centred on it
      fx(e.clientX - float.offsetWidth - 40);
      fy(e.clientY - float.offsetHeight / 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="relative bg-[var(--bg)] pt-24 pb-20 md:pt-40 md:pb-32" dir="rtl">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <Reveal className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="fade-up readex mb-5 text-sm text-[var(--lime)]">التشكيلة</p>
            <h2 className="readex text-[12vw] font-extralight leading-[1.02] text-white md:text-[5.6vw]">
              <Line>اختر</Line>
              <Line><span className="font-medium text-[var(--lime)]">مشروبك.</span></Line>
            </h2>
          </div>
          <p className="fade-up d1 ar max-w-sm text-base leading-[1.9] text-white/65 md:text-lg">
            خمس نكهات — مشروبات طاقة ومشروبات غازية. اختر واحد واكتشف تفاصيله.
          </p>
        </Reveal>

        <Reveal threshold={0.1}>
          <ul className="border-t border-white/10">
            {products.map((p, i) => (
              <li key={p.key} className={`fade-up ${i ? `d${Math.min(i, 3)}` : ""}`}>
                <a
                  href={`/products/${p.key}`}
                  className="range-row grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 md:grid-cols-[80px_1.3fr_1fr_1fr_auto] md:gap-8 md:py-9"
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") setActive(p.key); }}
                  onPointerLeave={() => setActive(null)}
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  }}
                >
                  {/* number on desktop, can thumbnail on phones */}
                  <span className="readex hidden text-sm font-light text-white/40 md:block" dir="ltr">0{i + 1}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/brand/home/${p.key}.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-[84px] w-16 rounded-xl object-cover md:hidden"
                  />
                  <span className="range-name min-w-0">
                    <span className="readex block text-[7.5vw] font-light leading-tight text-white md:text-[2.9vw]">{p.ar}</span>
                    <span className="ar mt-1 block text-sm text-white/55 md:hidden">{p.arTag}</span>
                  </span>
                  <span className="ar hidden text-base text-white/60 md:block">{p.arTag}</span>
                  <span className="serif-i hidden items-center gap-2 text-2xl text-white/70 md:flex" dir="ltr">
                    {latin[p.key]?.brand && <BrandWord className="text-[0.8em]" />}
                    {latin[p.key]?.name ?? p.en}
                  </span>
                  <span className="range-arrow text-2xl text-[var(--lime)]" dir="ltr" aria-hidden="true">←</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* the can that follows the pointer (mouse only) */}
      <div ref={floatRef} className={`range-float hidden md:block ${active ? "is-on" : ""}`} aria-hidden="true">
        {products.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.key} src={`/brand/home/${p.key}.jpg`} alt="" loading="lazy" className={active === p.key ? "is-active" : ""} />
        ))}
      </div>
    </section>
  );
}
