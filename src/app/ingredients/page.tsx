import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const ingredients = [
  {
    ar: "كافيين نباتي",
    en: "Plant Caffeine",
    arDesc:
      "كافيين مستخلص من مصادر طبيعية — حبوب البن الخضراء وأوراق الشاي. طاقة حقيقية بدون المواد الاصطناعية.",
    amount: "108mg",
  },
  {
    ar: "توراين",
    en: "Taurine",
    arDesc:
      "حمض أميني طبيعي يدعم وظائف القلب والدماغ. يساعد في تنظيم الطاقة والتركيز لفترات أطول.",
    amount: "1000mg",
  },
  {
    ar: "جينسنغ",
    en: "Ginseng Extract",
    arDesc:
      "جذر الجينسنغ — مستخدم لآلاف السنين في الطب التقليدي. يعزز المناعة ويحسّن الأداء الذهني والجسدي.",
    amount: "50mg",
  },
  {
    ar: "غوارانا",
    en: "Guarana",
    arDesc:
      "مصدر طبيعي للكافيين من غابات الأمازون. يُطلق الطاقة ببطء وبشكل مستمر، بدون الانهيار المفاجئ.",
    amount: "40mg",
  },
  {
    ar: "فيتامينات ب المركّبة",
    en: "B-Vitamin Complex",
    arDesc:
      "فيتامينات B3، B5، B6 وB12 — ضرورية لتحويل الطعام لطاقة ولدعم الجهاز العصبي والمزاج.",
    amount: "مركّب كامل",
  },
  {
    ar: "بدون سكر مضاف",
    en: "Zero Added Sugar",
    arDesc:
      "نستخدم محليات طبيعية بديلة عن السكر المكرر. طعم حلو بدون السعرات الفارغة أو ارتفاع السكر المفاجئ.",
    amount: "0g",
  },
];

const promises = [
  { ar: "بدون مواد حافظة", en: "No Preservatives" },
  { ar: "بدون ألوان اصطناعية", en: "No Artificial Colors" },
  { ar: "بدون نكهات اصطناعية", en: "No Artificial Flavors" },
  { ar: "نباتي 100%", en: "100% Vegan" },
  { ar: "خالي من الغلوتين", en: "Gluten Free" },
  { ar: "صُنع في فلسطين", en: "Made in Palestine" },
];

export const metadata = {
  title: "المكونات — EXTRON",
};

export default function IngredientsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--bg)] pt-28 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <a href="/" className="ar mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[var(--lime)]" dir="rtl">
            <span dir="ltr">→</span>
            <span>العودة للرئيسية</span>
          </a>
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
            <span className="h-px w-8 bg-[var(--lime)]" />
            المكونات · Ingredients
          </p>
          <h1 className="ar-display text-[12vw] leading-[0.9] text-white md:text-[6vw]">
            شو <span className="text-[var(--lime)]">جوّا؟</span>
          </h1>
          <p className="ar mt-6 max-w-2xl text-lg leading-relaxed text-white/60" dir="rtl">
            كل مكوّن في إكسترون مختار بعناية. ما في حشو، ما في مفاجآت — بس مواد
            طبيعية مثبتة علمياً تعطيك طاقة حقيقية ومستمرة.
          </p>

          {/* Ingredient cards */}
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ing) => (
              <div
                key={ing.en}
                className="group border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[var(--lime)]/30"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="ar-display text-xl text-white">{ing.ar}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-white/40">
                      {ing.en}
                    </p>
                  </div>
                  <span className="display text-lg text-[var(--lime)]">
                    {ing.amount}
                  </span>
                </div>
                <p className="ar text-sm leading-relaxed text-white/55" dir="rtl">
                  {ing.arDesc}
                </p>
              </div>
            ))}
          </div>

          {/* Our promises */}
          <div className="mt-20">
            <h2 className="ar-display mb-8 text-3xl text-white md:text-4xl">
              وعودنا <span className="text-[var(--lime)]">إلك.</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {promises.map((p) => (
                <div
                  key={p.en}
                  className="border border-white/10 bg-white/[0.02] p-4 text-center"
                >
                  <p className="ar text-sm font-bold text-[var(--lime)]">
                    {p.ar}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {p.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
