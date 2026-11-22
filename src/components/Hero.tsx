import Image from "@/components/Img";

// Phone hero: one picture, shown whole at its own size ratio (941×1672) — never cropped.
const MOBILE_BANNER = { src: "/brand/hero-mobile-nature.jpg", alt: "مشروبات الطاقة — طاقة من الطبيعة", w: 941, h: 1672 };

function MobileHero() {
  return (
    <section className="hero-mobile overflow-hidden bg-[#05060a] md:hidden">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${MOBILE_BANNER.w} / ${MOBILE_BANNER.h}` }}>
        <Image src={MOBILE_BANNER.src} alt={MOBILE_BANNER.alt} fill priority sizes="100vw" className="object-contain object-center" />

        <div className="hero-rise absolute inset-x-0 bottom-[104px] z-10 flex justify-center px-6">
          <a
            href="/about"
            dir="rtl"
            className="hero-mobile-cta ar inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-bold text-[#05060a] shadow-lg transition-colors active:bg-gray-200"
          >
            <span>اعرف أكثر عن إكسترون</span>
            <span dir="ltr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Banner artwork is 1774×887 (2:1). It runs edge to edge across the screen
// and is shown whole — never cropped.
const BANNER = { src: "/brand/banners/energy-nature.jpg", alt: "مشروبات الطاقة — طاقة من الطبيعة" };
const BANNER_RATIO = 1774 / 887;

function DesktopHero() {
  return (
    <section className="relative isolate hidden flex-col bg-[#05060a] md:flex">
      {/* Banner — full screen width, whole picture */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: String(BANNER_RATIO) }}>
        <div className="hero-zoom absolute inset-0">
          <Image src={BANNER.src} alt={BANNER.alt} fill priority sizes="100vw" className="object-contain object-center" />
        </div>
      </div>

      {/* Buttons — on the picture itself, clear of the straps that cross its bottom edge */}
      <div className="hero-rise absolute inset-x-0 bottom-[96px] z-10 flex flex-col items-center gap-4">
        <div className="flex flex-row-reverse items-center gap-3" dir="ltr">
          <a
            href="/products"
            dir="rtl"
            className="hero-cta-primary group/cta inline-flex items-center justify-center gap-3 rounded-full bg-[var(--lime)] px-8 py-4 font-black text-black shadow-[0_12px_32px_-6px_rgba(166,236,47,0.5)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5"
            style={{ "--glow": "var(--lime)" } as React.CSSProperties}
          >
            <span className="ar text-base">استكشف التشكيلة</span>
            <span dir="ltr" className="transition-transform duration-300 group-hover/cta:-translate-x-1">←</span>
          </a>
          <a
            href="/about"
            dir="rtl"
            className="hero-cta-secondary group/sec ar inline-flex items-center gap-2 rounded-full border border-white/30 bg-black px-7 py-4 text-sm font-bold text-white shadow-[0_10px_28px_-6px_rgba(0,0,0,0.7)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5"
            style={{ "--glow": "#ffffff" } as React.CSSProperties}
          >
            <span>اعرف أكثر عن إكسترون</span>
            <span dir="ltr" className="transition-transform duration-300 group-hover/sec:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <div id="top">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
