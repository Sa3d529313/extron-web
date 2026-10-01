"use client";

import Image from "@/components/Img";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const images = [
  "/lifestyle/pic1.jpg",
  "/lifestyle/pic2.jpg",
  "/lifestyle/pic7.jpg",
  "/lifestyle/pic3.jpg",
  "/lifestyle/pic11.jpg",
  "/lifestyle/pic4.jpg",
  "/lifestyle/pic9.jpg",
  "/lifestyle/pic13.png",
  "/lifestyle/pic5.jpg",
  "/lifestyle/pic14.png",
  "/lifestyle/pic8.jpg",
  "/lifestyle/pic6.jpg",
  "/lifestyle/pic10.jpg",
];

export default function GalleryGrid() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gal-item").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const gridImages = images.slice(0, 12);
  const bannerImage = images[12];

  return (
    <div ref={ref} className="mx-auto mt-12 max-w-[1400px] px-4 md:mt-16 md:px-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {gridImages.map((src) => (
          <div key={src} className="gal-item group overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>
        ))}
      </div>
      {bannerImage && (
        <div className="gal-item group mt-3 overflow-hidden md:mt-4">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src={bannerImage}
              alt=""
              fill
              sizes="90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
