import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
  title: "المعرض — EXTRON",
};

export default function GalleryPage() {
  return (
    <>
      <Nav forceLight />
      <main className="min-h-screen bg-[var(--bg)] pt-28 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <a href="/extron-web/" className="ar mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[var(--lime)]" dir="rtl">
            <span dir="ltr">→</span>
            <span>العودة للرئيسية</span>
          </a>
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
            <span className="h-px w-8 bg-[var(--lime)]" />
            المعرض · Gallery
          </p>
          <h1 className="readex text-[12vw] leading-[0.9] text-white md:text-[6vw]">
            لحظات <span className="text-[var(--lime)]">إكسترون.</span>
          </h1>
          <p className="ar mt-6 max-w-2xl text-lg leading-relaxed text-white/60" dir="rtl">
            صور من عالمنا — الأماكن، الناس، والطاقة اللي بتحكي قصة إكسترون.
          </p>
        </div>

        <GalleryGrid />
      </main>
      <Footer />
    </>
  );
}
