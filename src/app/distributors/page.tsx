import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DistributorForm from "@/components/Distributors";

export const metadata = {
  title: "للتجار والموزعين — EXTRON",
};

export default function DistributorsPage() {
  return (
    <>
      <Nav forceLight />
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Intro above the form */}
        <div className="mx-auto max-w-[1400px] px-5 pt-24 pb-8 md:px-10 md:pt-28 md:pb-16">
          <a href="/extron-web/" className="ar mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[var(--lime)]" dir="rtl">
            <span dir="ltr">→</span>
            <span>العودة للرئيسية</span>
          </a>
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
            <span className="h-px w-8 bg-[var(--lime)]" />
            للتجار · For Trade
          </p>
          <h1 className="readex text-[12vw] leading-[0.9] text-white md:text-[5vw]">
            اشتغل <span className="text-[var(--lime)]">معنا.</span>
          </h1>
        </div>

        {/* The original distributor form section — full width, lime design */}
        <DistributorForm />

        {/* Extra info below the form */}
        <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-24">
          <p className="ar mx-auto max-w-2xl text-center text-base leading-relaxed text-white/60 md:text-lg" dir="rtl">
            سواء كنت صاحب سوبرماركت، كافيه، أو مطعم — EXTRON علامة جاهزة تعطيك
            منتج قوي وطلب حقيقي من الزبائن.
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 md:gap-6">
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <p className="readex text-lg text-[var(--lime)]">منتج مطلوب</p>
              <p className="ar mt-2 text-sm leading-relaxed text-white/50" dir="rtl">
                الزبائن بيدوروا عليه — بيبيع حاله لأنه مختلف.
              </p>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <p className="readex text-lg text-[var(--lime)]">هوامش ربح تنافسية</p>
              <p className="ar mt-2 text-sm leading-relaxed text-white/50" dir="rtl">
                أسعار جملة تترك ربح حقيقي لك.
              </p>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <p className="readex text-lg text-[var(--lime)]">دعم تسويقي كامل</p>
              <p className="ar mt-2 text-sm leading-relaxed text-white/50" dir="rtl">
                لافتات، ثلاجات عرض، عينات مجانية.
              </p>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <p className="readex text-lg text-[var(--lime)]">توصيل منتظم</p>
              <p className="ar mt-2 text-sm leading-relaxed text-white/50" dir="rtl">
                جدول توزيع أسبوعي يغطي كل المدن.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
