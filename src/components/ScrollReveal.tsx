"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 100px 0px" }
    );

    document
      .querySelectorAll(".lineup-card, .perk-card, .about-tile, .about-fade, .pillar")
      .forEach((el, i) => {
        (el as HTMLElement).style.transitionDelay = `${(i % 5) * 80}ms`;
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  return null;
}
