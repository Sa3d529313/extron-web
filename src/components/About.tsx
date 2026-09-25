"use client";

import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
} from "@/components/ui/animated-gallery";

const values = [
  { en: "Quality First", ar: "الجودة أولاً" },
  { en: "Clean Ingredients", ar: "مكونات نظيفة" },
  { en: "Global Standards", ar: "معايير عالمية" },
];

const COL_1 = [
  "/lifestyle/pic1.jpg",
  "/lifestyle/pic4.jpg",
  "/lifestyle/pic7.jpg",
];
const COL_2 = [
  "/lifestyle/pic2.jpg",
  "/lifestyle/pic5.jpg",
  "/lifestyle/pic8.jpg",
];
const COL_3 = [
  "/lifestyle/pic6.jpg",
  "/lifestyle/pic9.jpg",
  "/lifestyle/pic3.jpg",
];

const MOBILE_IMAGES = [
  "/lifestyle/pic1.jpg",
  "/lifestyle/pic2.jpg",
  "/lifestyle/pic4.jpg",
  "/lifestyle/pic5.jpg",
  "/lifestyle/pic6.jpg",
  "/lifestyle/pic7.jpg",
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
      className="relative pt-4 pb-0 md:pt-8 md:pb-0"
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
        <h2 className="abt-reveal readex text-[11vw] leading-[0.9] text-white md:text-[6vw]">
          من تركيا <span className="text-[var(--lime)]">لفلسطين.</span>
        </h2>
        <p className="abt-reveal display mt-3 text-xl text-white/25 md:text-2xl">
          FROM TURKEY TO PALESTINE.
        </p>

        <div className="abt-reveal ar mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg" dir="rtl">
          <ScrollReveal baseOpacity={0.15} blurStrength={3} baseRotation={2}>
            {"إكسترون علامة تركية أصيلة في عالم مشروبات الطاقة، تفتح أبوابها الآن في فلسطين. خبرة عالمية بنكهة محلية — جودة أوروبية، بمعايير لا تقبل التنازل."}
          </ScrollReveal>
        </div>
      </div>

      {/* MOBILE — simple photo grid, no 3D */}
      <div className="mx-auto mt-12 max-w-md px-4 md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {MOBILE_IMAGES.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              width={400}
              height={533}
              loading="eager"
              sizes="50vw"
              className="aspect-[3/4] w-full rounded-md object-cover"
            />
          ))}
        </div>
      </div>

      {/* DESKTOP — original 3D animated gallery (untouched) */}
      <div className="mx-auto mt-24 hidden max-w-[1600px] px-8 md:block">
        <ContainerScroll style={{ height: "350vh" }}>
          <ContainerSticky className="overflow-visible" style={{ height: "110vh" }}>
            <GalleryContainer>
              <GalleryCol yRange={["5%", "-30%"]} className="-mt-2">
                {COL_1.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={600}
                    height={800}
                    sizes="33vw"
                    className="aspect-[3/4] w-full rounded-md object-cover shadow-lg"
                  />
                ))}
              </GalleryCol>
              <GalleryCol className="mt-[-30%]" yRange={["15%", "-25%"]}>
                {COL_2.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={600}
                    height={800}
                    sizes="33vw"
                    className="aspect-[3/4] w-full rounded-md object-cover shadow-lg"
                  />
                ))}
              </GalleryCol>
              <GalleryCol yRange={["5%", "-30%"]} className="-mt-2">
                {COL_3.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={600}
                    height={800}
                    sizes="33vw"
                    className="aspect-[3/4] w-full rounded-md object-cover shadow-lg"
                  />
                ))}
              </GalleryCol>
            </GalleryContainer>
          </ContainerSticky>
        </ContainerScroll>
      </div>

      {/* VALUES — Arabic primary */}
      <div className="mx-auto mt-100 max-w-[1600px] px-6 pb-16 md:px-8 md:pb-32">
        <p className="abt-reveal mb-6 text-center text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
          قيمنا · What We Stand For
        </p>
        <div className="abt-reveal grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {values.map((v) => (
            <div
              key={v.en}
              className="group border border-white/10 bg-white/[0.02] p-5 text-center transition-colors hover:border-[var(--lime)]/40"
            >
              <p className="readex text-xl text-[var(--lime)] md:text-2xl">
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
