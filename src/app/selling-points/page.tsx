import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SellingPoints from "@/components/SellingPoints";

export const metadata = {
  title: "نقاط البيع — EXTRON",
  description:
    "اعثر على أقرب نقطة بيع لمشروبات إكسترون في مدينتك — سوبرماركت، كافيهات ومطاعم في نابلس وقلقيلية.",
};

export default function SellingPointsPage() {
  return (
    <>
      <Nav forceLight />
      <main className="min-h-screen bg-[var(--bg)]">
        <div className="mx-auto max-w-[1400px] px-5 pt-24 pb-8 md:px-10 md:pt-28 md:pb-12">
          <Link href="/" className="ar mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[var(--lime)]" dir="rtl">
            <span dir="ltr">→</span>
            <span>العودة للرئيسية</span>
          </Link>
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]" dir="rtl">
            <span className="h-px w-8 bg-[var(--lime)]" />
            نقاط البيع · Where to Buy
          </p>
          <h1 className="readex text-[12vw] leading-[0.9] text-white md:text-[5vw]" dir="rtl">
            وين تلاقي <span className="text-[var(--lime)]">إكسترون؟</span>
          </h1>
          <p className="ar mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg" dir="rtl">
            اختر مدينتك وشوف أقرب سوبرماركت، كافيه أو مطعم بيبيع منتجات إكسترون.
          </p>
        </div>

        <SellingPoints />
      </main>
      <Footer />
    </>
  );
}
