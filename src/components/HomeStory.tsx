"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pinned story: the can stays on stage while the brand's four promises rise in
// word by word out of a blur and leave again, one after another. In the last
// beat the can moves to the centre and grows.
const statements = [
  { words: ["طاقة", "من", "الطبيعة."], en: "Energy from nature" },
  { words: ["مكونات", "نظيفة."], en: "Clean ingredients" },
  { words: ["الجودة", "أولاً."], en: "Quality first" },
  { words: ["معايير", "عالمية."], en: "Global standards" },
];

export default function HomeStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;

    const ctx = gsap.context(() => {
      const can = section.querySelector<HTMLElement>(".story-can")!;
      const glow = section.querySelector<HTMLElement>(".story-glow")!;
      const blocks = gsap.utils.toArray<HTMLElement>(".story-statement");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // the can drifts gently the whole way through
      tl.fromTo(can, { yPercent: 6, rotation: -4 }, { yPercent: -4, rotation: 3, duration: blocks.length * 2.2 }, 0);

      blocks.forEach((block, i) => {
        const words = block.querySelectorAll(".story-word");
        const sub = block.querySelector(".story-sub");
        const at = i * 2.2;
        tl.to(words, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.7, stagger: 0.14, ease: "power2.out" }, at)
          .to(sub, { opacity: 1, duration: 0.5 }, at + 0.35);
        if (i < blocks.length - 1) {
          tl.to(words, { opacity: 0, filter: "blur(10px)", y: "-0.35em", duration: 0.55, stagger: 0.06, ease: "power2.in" }, at + 1.55)
            .to(sub, { opacity: 0, duration: 0.4 }, at + 1.55);
        }
      });

      // final beat: the can takes centre stage
      const end = blocks.length * 2.2;
      const last = blocks[blocks.length - 1];
      tl.to(last.querySelectorAll(".story-word, .story-sub"), { opacity: 0, filter: "blur(10px)", duration: 0.6, stagger: 0.04 }, end - 0.2)
        .to(can, {
          // measured from the wrapper (which the timeline never moves), relative
          // to the sticky stage, so it's right whether or not the stage is pinned yet
          x: () => {
            const stage = can.closest(".sticky")!.getBoundingClientRect();
            const r = can.parentElement!.getBoundingClientRect();
            return stage.width / 2 - (r.left - stage.left + r.width / 2);
          },
          y: () => {
            const stage = can.closest(".sticky")!.getBoundingClientRect();
            const r = can.parentElement!.getBoundingClientRect();
            return stage.height / 2 + 20 - (r.top - stage.top + r.height / 2);
          },
          // grow, but never past ~84% of the screen's height
          scale: () => Math.min(window.innerWidth < 768 ? 1.25 : 1.45, (window.innerHeight * 0.84) / can.offsetHeight),
          rotation: 0,
          yPercent: 0,
          duration: 1.6,
          ease: "power2.inOut",
        }, end - 0.1)
        .to(glow, { opacity: 1, scale: 1.25, duration: 1.6, ease: "power2.inOut" }, end - 0.1)
        .to({}, { duration: 0.6 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[var(--bg)]" style={{ height: "520vh" }} data-badge="white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="story-glow" style={{ opacity: 0.7 }} />

        {/* the can — left of centre on desktop, upper middle on phones */}
        {/* the wrapper places it; the inner element is what the timeline moves */}
        <div className="absolute left-1/2 top-[15%] w-[min(54vw,34svh)] max-w-[300px] -translate-x-1/2 md:left-[30%] md:top-1/2 md:w-[min(24vw,52vh)] md:max-w-[400px] md:-translate-y-1/2">
        <div className="story-can">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/home/extron-green.jpg"
            alt="علبة إكسترون الأخضر"
            className="block h-auto w-full"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 58% 56% at 50% 50%, #000 62%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 58% 56% at 50% 50%, #000 62%, transparent 100%)",
            }}
          />
        </div>
        </div>

        {/* statements — they share one spot and take turns */}
        {statements.map((s) => (
          <div
            key={s.en}
            className="story-statement pointer-events-none absolute inset-x-6 bottom-[12%] text-center md:inset-x-auto md:bottom-auto md:right-[8%] md:top-1/2 md:w-[46%] md:-translate-y-1/2 md:text-right"
            dir="rtl"
          >
            <p className="readex text-[13vw] font-light leading-[1.05] text-white md:text-[6.2vw]">
              {s.words.map((w, i) => (
                <span key={i}>
                  <span className={`story-word ${i === s.words.length - 1 ? "font-medium text-[var(--lime)]" : ""}`}>{w}</span>
                  {i < s.words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
            <p className="story-sub serif-i mt-3 text-xl text-white/60 opacity-0 md:mt-5 md:text-3xl" dir="ltr">
              {s.en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
