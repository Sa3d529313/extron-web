"use client";

import Image from "@/components/Img";
import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "#products", ar: "المنتجات" },
  { href: "#ingredients", ar: "المكونات" },
  { href: "/extron-web/distributors", ar: "للتجار" },
  { href: "#about", ar: "عن الشركة" },
];

export default function Nav({ forceLight = false, forceDark = false }: { forceLight?: boolean; forceDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const revertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clearRevert = useCallback(() => {
    if (revertTimer.current) { clearTimeout(revertTimer.current); revertTimer.current = null; }
  }, []);

  useEffect(() => {
    if (hovered && !forceLight) {
      clearRevert();
      revertTimer.current = setTimeout(() => setHovered(false), 10000);
    }
    return clearRevert;
  }, [hovered, forceLight, clearRevert]);

  const isLight = !forceDark && (forceLight || (hovered && !open));

  return (
    <header
      className="fixed z-50"
      style={{
        top: "0px",
        left: "12px",
        right: "12px",
        paddingTop: "10px",
      }}
    >
      {/* Main bar */}
      <div
        style={{
          borderRadius: open ? "14px 14px 0 0" : "14px",
          backgroundColor: forceDark
            ? "rgba(5, 6, 10, 1)"
            : open
              ? isLight
                ? "rgba(255, 255, 255, 0.98)"
                : "rgba(5, 6, 10, 0.95)"
              : isLight
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(20, 20, 20, 0.45)",
          backdropFilter: "blur(14px) saturate(180%)",
          WebkitBackdropFilter: "blur(14px) saturate(180%)",
          borderTop: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
          borderLeft: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
          borderRight: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
          borderBottom: open ? "none" : (isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)"),
          transition:
            "background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), border-color 400ms ease",
        }}
        onMouseEnter={() => { clearRevert(); setHovered(true); }}
        onMouseLeave={() => { clearRevert(); setHovered(false); }}
      >
        <div
          dir="ltr"
          className="mx-auto grid max-w-[1600px] items-center px-6 md:px-8"
          style={{
            height: "84px",
            gridTemplateColumns: "1fr auto 1fr",
          }}
        >
          {/* LEFT — Nav links (desktop) / empty on mobile */}
          <nav className="hidden items-center justify-start md:flex" style={{ gridColumn: 1 }}>
            <div className="flex items-center gap-1" style={{ "--nav-accent": isLight ? "#05060a" : "#fff" } as React.CSSProperties}>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="nav-link-floating ar relative px-5 py-2 text-[15px] font-bold"
                  style={{
                    color: isLight ? "#05060a" : "rgba(255,255,255,0.85)",
                    transition: "color 300ms ease",
                  }}
                >
                  <span className="nav-link-floating-label">{l.ar}</span>
                  <span className="nav-link-floating-bar" />
                </a>
              ))}
            </div>
          </nav>

          {/* CENTER — Logo */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/extron-web/"
            aria-label="EXTRON — الصفحة الرئيسية"
            className="flex items-center justify-center"
            style={{ gridColumn: 2 }}
          >
            <div className="flex items-center" style={{ height: "56px" }}>
              <Image
                src="/brand/logo-e.png"
                alt=""
                width={311}
                height={724}
                priority
                className="h-full w-auto"
                style={{
                  filter: isLight ? "brightness(0)" : "none",
                  transition: "filter 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <Image
                src="/brand/logo-x.png"
                alt=""
                width={458}
                height={724}
                priority
                className="h-full w-auto"
                style={{
                  transition: "filter 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <Image
                src="/brand/logo-tron.png"
                alt=""
                width={1403}
                height={724}
                priority
                className="h-full w-auto"
                style={{
                  filter: isLight ? "brightness(0)" : "none",
                  transition: "filter 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
          </a>

          {/* RIGHT — CTA + hamburger */}
          <div className="flex items-center justify-end gap-3 md:gap-5" style={{ gridColumn: 3 }}>
            <a
              href="/extron-web/distributors"
              dir="rtl"
              className="cta-lime hidden items-center gap-2 px-5 py-2.5 text-sm font-black md:inline-flex"
              style={{
                backgroundColor: "var(--lime)",
                color: "#000",
                borderRadius: "10px",
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
                    open
                      ? "translate-y-[4px] rotate-45 bg-red-500"
                      : isLight
                        ? "bg-black"
                        : "bg-white"
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 transition-all duration-300 origin-center ${
                    open
                      ? "-translate-y-[4px] -rotate-45 bg-red-500"
                      : isLight
                        ? "bg-black"
                        : "bg-white"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — rendered BELOW the bar */}
      {open && (
        <div
          className="relative z-50 md:hidden"
          style={{
            borderRadius: "0 0 14px 14px",
            backgroundColor: isLight
              ? "rgba(255, 255, 255, 0.98)"
              : "rgba(5, 6, 10, 0.95)",
            backdropFilter: "blur(14px) saturate(180%)",
            WebkitBackdropFilter: "blur(14px) saturate(180%)",
            border: isLight
              ? "1px solid rgba(0,0,0,0.08)"
              : "1px solid rgba(255, 255, 255, 0.08)",
            borderTop: "none",
          }}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4"
                dir="rtl"
                style={{
                  borderBottom: isLight ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span
                  className="ar text-base font-bold"
                  style={{ color: isLight ? "#05060a" : "#fff" }}
                >
                  {l.ar}
                </span>
                <span className="text-[var(--lime)]">←</span>
              </a>
            ))}
            <a
              href="/extron-web/distributors"
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
