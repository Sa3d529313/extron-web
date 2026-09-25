import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "@/components/Img";

const timeline = [
  {
    year: "2023",
    ar: "بداية الفكرة",
    desc: "بدأت فكرة إكسترون من سؤال بسيط: ليش ما في مشروب طاقة فلسطيني نظيف وبمعايير عالمية؟",
  },
  {
    year: "2024",
    ar: "تطوير التركيبة",
    desc: "أشهر من البحث والتجارب للوصول لتركيبة نظيفة — كافيين نباتي، بدون مواد حافظة، بدون ألوان اصطناعية.",
  },
  {
    year: "2024",
    ar: "تصميم الهوية",
    desc: "هوية بصرية عصرية تجمع بين الجرأة والنظافة — علبة تلفت النظر على أي رف.",
  },
  {
    year: "2025",
    ar: "الإطلاق",
    desc: "إطلاق خمسة منتجات دفعة وحدة — مشروبات طاقة، صودا، وكولا. من نابلس للعالم.",
  },
];

const team = [
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
      <Nav />
      <main className="min-h-screen bg-[var(--bg)] pt-28 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <a href="/extron-web/" className="ar mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[var(--lime)]" dir="rtl">
            <span dir="ltr">→</span>
            <span>العودة للرئيسية</span>
          </a>
          {/* Hero header */}
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
            <span className="h-px w-8 bg-[var(--lime)]" />
            عن الشركة · About
          </p>
          <h1 className="ar-display text-[12vw] leading-[0.9] text-white md:text-[6vw]">
            من فلسطين
            <br />
            <span className="text-[var(--lime)]">للعالم.</span>
          </h1>
          <p className="ar mt-6 max-w-2xl text-lg leading-relaxed text-white/60" dir="rtl">
            إكسترون علامة فلسطينية جديدة أُطلقت لتغيّر مفهوم مشروبات الطاقة في
            المنطقة. تجربة نظيفة، حقيقية، صُنعت هون بمعايير عالمية.
          </p>

          {/* Photo row */}
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/lifestyle/pic1.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/lifestyle/pic4.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/lifestyle/pic5.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-24">
            <h2 className="ar-display mb-10 text-3xl text-white md:text-4xl">
              رحلتنا
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {timeline.map((t, i) => (
                <div
                  key={i}
                  className="border-t-2 border-[var(--lime)]/40 pt-6"
                >
                  <p className="display text-4xl text-[var(--lime)]">
                    {t.year}
                  </p>
                  <p className="ar-display mt-2 text-lg text-white">
                    {t.ar}
                  </p>
                  <p className="ar mt-3 text-sm leading-relaxed text-white/55" dir="rtl">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mt-24">
            <h2 className="ar-display mb-10 text-3xl text-white md:text-4xl">
              شو بيميّزنا
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {team.map((t) => (
                <div
                  key={t.en}
                  className="border border-white/10 bg-white/[0.02] p-8"
                >
                  <p className="ar-display text-2xl text-[var(--lime)]">
                    {t.ar}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/30">
                    {t.en}
                  </p>
                  <p className="ar mt-5 text-sm leading-relaxed text-white/60" dir="rtl">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission statement */}
          <div className="mt-24 border border-[var(--lime)]/20 bg-[var(--lime)]/5 p-8 text-center md:p-12">
            <p className="ar-display text-2xl text-white md:text-3xl">
              &ldquo;هدفنا إن أي حدا بالعالم يشرب مشروب طاقة
              <br className="hidden md:inline" />
              ويعرف إنه <span className="text-[var(--lime)]">صُنع في فلسطين.</span>&rdquo;
            </p>
            <p className="ar mt-4 text-sm text-white/50">— فريق إكسترون</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
