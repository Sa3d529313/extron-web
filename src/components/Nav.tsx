"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#products", ar: "المنتجات" },
  { href: "#ingredients", ar: "المكونات" },
  { href: "#distributors", ar: "للتجار" },
  { href: "#about", ar: "عن الشركة" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = hovered && !open;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: open
          ? "rgba(5, 6, 10, 0.95)"
          : isLight
            ? "rgba(255, 255, 255, 0.97)"
            : scrolled
              ? "rgba(5, 6, 10, 0.6)"
              : "transparent",
        backdropFilter: scrolled || isLight ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled || isLight ? "blur(14px)" : "none",
        transition: "background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 400ms ease",
      }}
    >
      {/* Bottom border — subtle white line, fades out when hovered to white bg */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background: isLight
            ? "rgba(0,0,0,0.08)"
            : "rgba(255,255,255,0.15)",
          transition: "background 400ms ease",
        }}
      />

      <div
        dir="ltr"
        className="mx-auto flex h-20 max-w-[1600px] items-center gap-6 px-6 md:h-24 md:gap-10 md:px-10"
      >
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" aria-label="EXTRON — الصفحة الرئيسية" className="shrink-0">
          <Image
            src="/brand/logo-name.png"
            alt="EXTRON"
            width={2172}
            height={724}
            priority
            className="h-10 w-auto md:h-14"
            style={{
              filter: isLight ? "invert(1) hue-rotate(180deg)" : "none",
              transition: "filter 400ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-1 rounded-full px-2 py-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="ar relative px-5 py-2 text-sm font-bold transition-colors duration-300"
                style={{ color: isLight ? "#05060a" : "rgba(255,255,255,0.85)" }}
              >
                {l.ar}
              </a>
            ))}
          </div>
        </nav>

        {/* Right — CTA + hamburger */}
        <div className="ml-auto flex items-center gap-3 md:ml-0 md:gap-5">
          <a
            href="#distributors"
            dir="rtl"
            className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black md:inline-flex"
            style={{
              backgroundColor: isLight ? "#05060a" : "var(--lime)",
              color: isLight ? "#fff" : "#000",
              transition: "background-color 400ms ease, color 400ms ease",
            }}
          >
            <span className="ar">تواصل معنا</span>
            <span dir="ltr">←</span>
          </a>
          <button
            aria-label="القائمة"
            onClick={() => setOpen((s) => !s)}
            className="grid h-11 w-11 place-items-center md:hidden"
          >
            <div className="flex flex-col gap-[6px]">
              <span
                className={`block h-[2px] w-5 transition-all duration-300 origin-center ${
                  open ? "translate-y-[4px] rotate-45 bg-red-500" : isLight ? "bg-black" : "bg-white"
                }`}
              />
              <span
                className={`block h-[2px] w-5 transition-all duration-300 origin-center ${
                  open ? "-translate-y-[4px] -rotate-45 bg-red-500" : isLight ? "bg-black" : "bg-white"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden">
          <nav className="flex flex-col gap-1 border-t border-white/10 bg-[var(--bg)]/95 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/5 py-4"
                dir="rtl"
              >
                <span className="ar text-base font-bold">{l.ar}</span>
                <span className="text-[var(--lime)]">←</span>
              </a>
            ))}
            <a
              href="#distributors"
              onClick={() => setOpen(false)}
              dir="rtl"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--lime)] px-5 py-3 text-sm font-black text-black"
            >
              <span className="ar">تواصل معنا</span>
              <span dir="ltr">←</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
