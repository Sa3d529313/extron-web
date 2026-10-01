import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "@/components/Img";
import { products } from "@/data/products";

export const metadata = {
  title: "المنتجات — EXTRON",
};

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white pt-28 pb-20">
        <style>{`
          .product-card { --card-glow: #000; }
          .product-card:hover { box-shadow: 0 20px 60px color-mix(in srgb, var(--card-glow) 25%, transparent), 0 0 0 2px color-mix(in srgb, var(--card-glow) 50%, transparent) !important; }
        `}</style>
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="mb-10 flex items-end justify-between" dir="rtl">
            <div>
              <h1 className="readex text-[10vw] leading-[1.1] text-black md:text-[5vw]">
                تشكيلتنا الكاملة
              </h1>
              <p className="space mt-2 text-sm font-semibold text-black/40" style={{ letterSpacing: "-0.02em" }} dir="ltr">
                THE LINEUP
              </p>
            </div>
            <p className="readex hidden text-sm text-black/50 md:block">اختر مشروبك واكتشف تفاصيله.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5" dir="ltr">
            {products.map((p, i) => (
              <a
                key={p.key}
                href={`/extron-web/products/${p.key}`}
                className="product-card group flex flex-col overflow-hidden border bg-[#fafaf8] p-3 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.04] hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-4"
                style={{ borderColor: p.accent + "40", "--card-glow": p.accent } as React.CSSProperties}
              >
                <div className="flex items-center justify-center overflow-hidden py-4 md:py-6">
                  <Image
                    src={p.src}
                    alt={p.en}
                    width={800}
                    height={1000}
                    priority={i < 5}
                    sizes="(min-width: 1000px) 19vw, 45vw"
                    className="h-auto w-full max-w-[200px] object-contain transition-transform duration-500 ease-out group-hover:scale-105 md:max-w-[240px]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 px-2 pb-3 pt-2 md:px-3">
                  <div className="flex-1">
                    <p className="readex mb-1 text-[11px] text-black/45" dir="rtl">{p.arTag}</p>
                    <h3 className="space text-base font-bold text-black md:text-lg" style={{ letterSpacing: "-0.04em", lineHeight: 1.2 }}>
                      {p.en}
                    </h3>
                  </div>
                  <span
                    className="readex inline-flex items-center justify-center gap-2 border px-3 py-2.5 text-xs transition-all duration-300 ease-out group-hover:border-transparent group-hover:shadow-md"
                    style={{
                      borderColor: p.accent + "30",
                      backgroundColor: "white",
                      color: "rgba(0,0,0,0.7)",
                    }}
                    dir="rtl"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-[-2px]">استكشف</span>
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[-4px]">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
