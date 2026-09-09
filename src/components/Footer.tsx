"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-x-0 top-6 select-none text-center">
        <p className="display text-[20vw] leading-none text-white/[0.03] md:text-[18vw]">
          EXTRON
        </p>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 py-10 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/brand/logo-name.png"
              alt="EXTRON"
              width={2172}
              height={724}
              className="h-10 w-auto md:h-14"
            />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/50 md:mt-6 md:text-sm">
              A new Palestinian beverage brand built to compete with the biggest
              names — clean ingredients, real energy.
            </p>
            <p className="ar mt-2 max-w-xs text-xs text-white/30">
              علامة فلسطينية جديدة بمكونات نظيفة وطاقة حقيقية.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">
              Explore
            </p>
            <ul className="space-y-3">
              {[
                ["#products", "Products"],
                ["#ingredients", "What's Inside"],
                ["#about", "About"],
              ].map(([href, en]) => (
                <li key={en}>
                  <a
                    href={href}
                    className="text-sm font-bold text-white transition-colors hover:text-[var(--lime)]"
                  >
                    {en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">
              For Trade
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="#distributors"
                  className="text-sm font-bold text-white hover:text-[var(--lime)]"
                >
                  Distribution
                </a>
              </li>
              <li>
                <a
                  href="tel:+970000000000"
                  className="text-sm font-bold text-white hover:text-[var(--lime)]"
                >
                  Call Us
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/970000000000"
                  className="text-sm font-bold text-white hover:text-[var(--lime)]"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">
              Follow
            </p>
            <ul className="space-y-3">
              {["Instagram", "Facebook", "TikTok"].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="text-sm font-bold text-white hover:text-[var(--lime)]"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/40 md:mt-16 md:flex-row md:gap-4 md:pt-8">
          <p>
            © {new Date().getFullYear()} EXTRON · Palestine · All rights
            reserved.
          </p>
          <p className="ar">صُنع بشغف — من نابلس إلى العالم.</p>
        </div>
      </div>
    </footer>
  );
}
