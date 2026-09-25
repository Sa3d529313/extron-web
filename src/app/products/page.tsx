import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "@/components/Img";

const products = [
  {
    key: "extron-green",
    src: "/cans/green-solo.png",
    ar: "إكسترون الأخضر",
    en: "EXTRON Original",
    arTag: "الأصلي · بداية الحكاية",
    arDesc:
      "طاقة حقيقية من مصادر حقيقية. كافيين نباتي، توراين، فيتامينات ب، جينسنغ وغوارانا — صُنعت للأداء، لا للانهيار السريع. المشروب اللي بدأنا فيه، واللي بيحمل هوية إكسترون الأصلية.",
    accent: "#a6ec2f",
    caffeine: "108mg",
    sugar: "0g",
    volume: "250ml",
  },
  {
    key: "extron-pink",
    src: "/cans/pink-solo.png",
    ar: "إكسترون للسيدات",
    en: "EXTRON for Women",
    arTag: "بنكهة الفراولة والتوت",
    arDesc:
      "طاقة صُممت خصيصاً لكِ. مضادات أكسدة، فيتامين B6 وB12، زنك وفيتامين D. بنكهة الفراولة والتوت — بدون تنازلات. مش بس مشروب طاقة، هاد اهتمام حقيقي بصحتك.",
    accent: "#f0338d",
    caffeine: "80mg",
    sugar: "0g",
    volume: "250ml",
  },
  {
    key: "for-us",
    src: "/cans/orange-solo.png",
    ar: "فور أص",
    en: "FOR US · Orange",
    arTag: "صودا برتقال منعشة",
    arDesc:
      "منعش، حلو، صريح. صودا برتقال بنكهة فاكهة حقيقية — لكل لحظة استراحة قصيرة. مش لازم يكون مشروب طاقة عشان يكون مميز.",
    accent: "#ff7a1a",
    caffeine: "—",
    sugar: "طبيعي",
    volume: "330ml",
  },
  {
    key: "fizo",
    src: "/cans/grey-solo.png",
    ar: "فيزو",
    en: "FIZO · Lemon-Lime",
    arTag: "صودا الجيل الجديد",
    arDesc:
      "بدون مواد حافظة. بدون ألوان اصطناعية. فقط نكهة ليمون نظيفة وفقاعات كافية لتنعشك. فيزو هي الصودا اللي ما لاقيناها بالسوق، فصنعناها.",
    accent: "#c8ff5a",
    caffeine: "—",
    sugar: "طبيعي",
    volume: "330ml",
  },
  {
    key: "cola-nova",
    src: "/cans/red-solo.png",
    ar: "كولا نوفا",
    en: "COLA NOVA",
    arTag: "الجيل الجديد من الكولا",
    arDesc:
      "كولا كما لم تشربها من قبل. طعم عميق، فقاعات قوية، طاقة مختلفة — الكولا اللي كنت تستناها. نكهة جديدة، هوية جديدة، كل إشي جديد.",
    accent: "#e5222b",
    caffeine: "—",
    sugar: "طبيعي",
    volume: "330ml",
  },
];

export const metadata = {
  title: "المنتجات — EXTRON",
};

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--bg)] pt-28 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <a href="/extron-web/" className="ar mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[var(--lime)]" dir="rtl">
            <span dir="ltr">→</span>
            <span>العودة للرئيسية</span>
          </a>
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
            <span className="h-px w-8 bg-[var(--lime)]" />
            المنتجات · Products
          </p>
          <h1 className="readex text-[12vw] leading-[0.9] text-white md:text-[6vw]">
            تشكيلتنا <span className="text-[var(--lime)]">الكاملة.</span>
          </h1>
          <p className="ar mt-6 max-w-2xl text-lg leading-relaxed text-white/60" dir="rtl">
            خمس منتجات مختلفة — من مشروب الطاقة النظيف للصودا المنعشة والكولا
            الجديدة. كلها صُنعت في فلسطين بمعايير عالمية. اكتشف اللي يناسبك.
          </p>

          <div className="mt-16 grid gap-10">
            {products.map((p) => (
              <div
                key={p.key}
                dir="ltr"
                className="grid items-center gap-8 border border-white/10 bg-white/[0.02] p-6 md:grid-cols-[0.4fr_1fr] md:gap-12 md:p-10"
              >
                <div className="relative flex items-center justify-center py-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
                    style={{ background: `${p.accent}44` }}
                  />
                  <Image
                    src={p.src}
                    alt={p.en}
                    width={300}
                    height={460}
                    className="relative z-10 h-auto w-[30vw] max-w-[200px]"
                    style={{
                      filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.4)) drop-shadow(0 0 20px ${p.accent}33)`,
                    }}
                  />
                </div>
                <div>
                  <p
                    className="mb-2 text-xs uppercase tracking-[0.3em]"
                    style={{ color: p.accent }}
                  >
                    {p.arTag}
                  </p>
                  <h2 className="readex text-[7vw] leading-[0.9] text-white md:text-[3.5vw]">
                    {p.ar}
                  </h2>
                  <p className="display mt-1 text-lg text-white/25">{p.en}</p>
                  <p
                    className="ar mt-4 max-w-lg text-base leading-relaxed text-white/65"
                    dir="rtl"
                  >
                    {p.arDesc}
                  </p>
                  <div className="mt-6 flex gap-6 text-sm">
                    <div>
                      <p className="ar text-[10px] text-white/40">كافيين</p>
                      <p className="display text-xl" style={{ color: p.accent }}>
                        {p.caffeine}
                      </p>
                    </div>
                    <div>
                      <p className="ar text-[10px] text-white/40">سكر</p>
                      <p className="display text-xl" style={{ color: p.accent }}>
                        {p.sugar}
                      </p>
                    </div>
                    <div>
                      <p className="ar text-[10px] text-white/40">الحجم</p>
                      <p className="display text-xl" style={{ color: p.accent }}>
                        {p.volume}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
