import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const values = [
  { en: "Quality First", ar: "الجودة أولاً" },
  { en: "Clean Ingredients", ar: "مكونات نظيفة" },
  { en: "Global Standards", ar: "معايير عالمية" },
];

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />

        {/* What We Stand For */}
        <section className="relative overflow-hidden bg-[var(--bg)] py-16 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-8">
            <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
              قيمنا · What We Stand For
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
              {values.map((v) => (
                <div
                  key={v.en}
                  className="group border border-white/10 bg-white/[0.02] p-5 text-center transition-colors hover:border-[var(--lime)]/40"
                >
                  <p className="readex text-xl text-[var(--lime)] md:text-2xl">{v.ar}</p>
                  <p className="display mt-2 text-xs text-white/30 uppercase">{v.en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
