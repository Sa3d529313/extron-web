"use client";

import Image from "@/components/Img";

const WHATSAPP_NUMBER = "970569995095";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

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

            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://www.instagram.com/extron.ps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 transition-colors hover:text-[var(--lime)]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/share/1GFFydHPL7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 transition-colors hover:text-[var(--lime)]"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 transition-colors hover:text-[var(--lime)]"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">
              Explore
            </p>
            <ul className="space-y-3">
              {[
                ["/extron-web/#products", "Products"],
                ["/extron-web/#ingredients", "What's Inside"],
                ["/extron-web/#about", "About"],
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
                  href="/extron-web/distributors"
                  className="text-sm font-bold text-white hover:text-[var(--lime)]"
                >
                  Distribution
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="text-sm font-bold text-white hover:text-[var(--lime)]"
                >
                  Call Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">
              Follow
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/extron.ps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[var(--lime)]"
                >
                  <InstagramIcon /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1GFFydHPL7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[var(--lime)]"
                >
                  <FacebookIcon /> Facebook
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[var(--lime)]"
                >
                  <WhatsAppIcon /> WhatsApp
                </a>
              </li>
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
