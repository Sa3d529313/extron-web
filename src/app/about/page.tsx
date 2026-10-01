import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "@/components/Img";

export const dynamic = "force-static";

const values = [
  {
    ar: "الرؤية",
    en: "Vision",
    desc: "نؤمن إن السوق الفلسطيني يستحق منتجات بنفس مستوى أكبر العلامات العالمية — وبنقدر نصنعها هون.",
  },
  {
    ar: "الجودة",
    en: "Quality",
    desc: "كل دفعة إنتاج بتمر بفحوصات جودة صارمة. ما بنساوم على المكونات ولا على النظافة ولا على الطعم.",
  },
  {
    ar: "المجتمع",
    en: "Community",
    desc: "إكسترون مش بس مشروب — هي حركة. بندعم المجتمع المحلي من خلال فرص عمل وشراكات حقيقية.",
  },
];

export const metadata = {
  title: "عن إكسترون — EXTRON",
};

export default function AboutPage() {
  return (
    <>
      <Nav forceLight />
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero section */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none opacity-[0.025]">
            <p className="display whitespace-nowrap text-[28vw] leading-none text-white">EXTRON</p>
          </div>

          <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
            <a href="/extron-web/" className="ar mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[var(--lime)]" dir="rtl">
              <span dir="ltr">→</span>
              <span>العودة للرئيسية</span>
            </a>

            <div className="grid items-end gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
              <div>
                <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
                  <span className="h-px w-8 bg-[var(--lime)]" />
                  عن الشركة · About
                </p>
                <h1 className="readex text-[14vw] leading-[0.85] text-white md:text-[7vw]">
                  من تركيا
                  <br />
                  <span className="text-[var(--lime)]">لفلسطين.</span>
                </h1>
              </div>

              <div className="md:pb-2">
                <p className="ar text-lg leading-[1.9] text-white/60 md:text-xl md:leading-[1.9]" dir="rtl">
                  إكسترون علامة تركية أصيلة في عالم مشروبات الطاقة، تفتح أبوابها في فلسطين والأردن
                  من خلال شراكة تجمع بين الخبرة التركية والرؤية الفلسطينية — جودة أوروبية بمعايير
                  عالمية، من المصنع في تركيا إلى الرفوف في فلسطين والأردن.
                </p>
              </div>
            </div>

            {/* Exclusive Distribution */}
            <div className="mt-16 grid items-center gap-6 border-t border-white/10 pt-10 md:grid-cols-[auto_1fr] md:gap-12">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--lime)]" />
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--lime)]">Exclusive Agency</p>
              </div>
              <div dir="rtl" className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="readex text-xl text-white md:text-2xl">
                  استيراد شركة عبدالكريم برهم
                </h2>
                <span className="readex text-sm text-white/40">— وكالة حصرية في الأردن وفلسطين</span>
              </div>
            </div>
          </div>
        </section>

        {/* Photo row */}
        <section className="bg-[var(--bg)]">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="grid gap-3 md:grid-cols-3 md:gap-4">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="/lifestyle/pic1.jpg" alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="/lifestyle/pic4.jpg" alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="/lifestyle/pic5.jpg" alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[var(--bg)] pt-20 pb-20 md:pt-28 md:pb-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="readex text-3xl text-white md:text-4xl">شو بيميّزنا</h2>
              <p className="hidden text-xs uppercase tracking-[0.2em] text-white/20 md:block">What Sets Us Apart</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {values.map((t) => (
                <div key={t.en} className="group border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-[var(--lime)]/25">
                  <p className="readex text-2xl text-[var(--lime)]">{t.ar}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/30">{t.en}</p>
                  <p className="ar mt-5 text-sm leading-relaxed text-white/60" dir="rtl">{t.desc}</p>
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
