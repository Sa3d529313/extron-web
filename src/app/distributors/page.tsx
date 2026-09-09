import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "شو هي الكميات اللي بقدر أبدأ فيها؟",
    a: "بنوفر باقات بداية مرنة تناسب كل حجم محل — من سوبرماركت صغير لسلسلة كبيرة. تواصل معنا ونحكيك عن الخيارات.",
  },
  {
    q: "كيف بتوصّلوا البضاعة؟",
    a: "عنا جدول توزيع أسبوعي يغطي المدن الرئيسية في فلسطين. التوصيل مجاني ضمن الكميات المتفق عليها.",
  },
  {
    q: "في دعم تسويقي للمحلات؟",
    a: "طبعاً! بنوفر لافتات، ستاندات عرض، ثلاجات برندد، وعينات مجانية لأول طلبية. كمان بندعمك على السوشال ميديا.",
  },
  {
    q: "شو سياسة الإرجاع؟",
    a: "بنسترجع أي كميات ما اتباعت خلال فترة الاتفاق — ما رح تضل عالبضاعة. هدفنا شراكة طويلة مش صفقة وحدة.",
  },
  {
    q: "بقدر أبيع إكسترون أونلاين؟",
    a: "أكيد! إذا عندك متجر إلكتروني أو بتبيع عبر السوشال ميديا، بنوفرلك أسعار خاصة وإمكانية شحن مباشر.",
  },
];

const coverage = [
  "نابلس",
  "رام الله",
  "الخليل",
  "بيت لحم",
  "جنين",
  "طولكرم",
  "قلقيلية",
  "طوباس",
  "سلفيت",
  "أريحا",
];

export const metadata = {
  title: "للتجار والموزعين — EXTRON",
};

export default function DistributorsPage() {
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
            للتجار · For Trade
          </p>
          <h1 className="ar-display text-[12vw] leading-[0.9] text-white md:text-[6vw]">
            اشتغل <span className="text-[var(--lime)]">معنا.</span>
          </h1>
          <p className="ar mt-6 max-w-2xl text-lg leading-relaxed text-white/60" dir="rtl">
            إكسترون مش بس مشروب — هي فرصة شراكة حقيقية. سواء كنت صاحب
            سوبرماركت، كافيه، مطعم أو حتى بتبيع أونلاين — عنا خطة إلك.
          </p>

          {/* Why partner */}
          <div className="mt-16">
            <h2 className="ar-display mb-8 text-3xl text-white md:text-4xl">
              ليش تشتغل مع إكسترون؟
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="ar-display text-lg text-[var(--lime)]">منتج مطلوب</p>
                <p className="ar mt-3 text-sm leading-relaxed text-white/55" dir="rtl">
                  مشروب طاقة نظيف بمعايير عالمية — الزبائن بيدوروا عليه. EXTRON بيبيع حاله لأنه مختلف عن كل اشي بالسوق.
                </p>
              </div>
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="ar-display text-lg text-[var(--lime)]">هوامش ربح تنافسية</p>
                <p className="ar mt-3 text-sm leading-relaxed text-white/55" dir="rtl">
                  أسعار الجملة مصممة تترك ربح حقيقي لك. كل ما بعت أكثر، هامش الربح بيزيد.
                </p>
              </div>
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="ar-display text-lg text-[var(--lime)]">دعم كامل</p>
                <p className="ar mt-3 text-sm leading-relaxed text-white/55" dir="rtl">
                  مواد تسويقية، ثلاجات عرض، لافتات، عينات مجانية — كل اللي بتحتاجه عشان المنتج يبرز عندك.
                </p>
              </div>
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="ar-display text-lg text-[var(--lime)]">توصيل منتظم</p>
                <p className="ar mt-3 text-sm leading-relaxed text-white/55" dir="rtl">
                  جدول توزيع أسبوعي ثابت يغطي كل المدن الرئيسية. ما رح تضل بدون بضاعة.
                </p>
              </div>
            </div>
          </div>

          {/* Coverage */}
          <div className="mt-20">
            <h2 className="ar-display mb-6 text-3xl text-white md:text-4xl">
              تغطيتنا <span className="text-[var(--lime)]">الحالية</span>
            </h2>
            <p className="ar mb-8 text-sm text-white/50" dir="rtl">
              بنغطي المدن التالية حالياً، وبنتوسع باستمرار:
            </p>
            <div className="flex flex-wrap gap-3">
              {coverage.map((c) => (
                <span
                  key={c}
                  className="ar border border-[var(--lime)]/30 bg-[var(--lime)]/5 px-5 py-2 text-sm font-bold text-[var(--lime)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="ar-display mb-8 text-3xl text-white md:text-4xl">
              أسئلة <span className="text-[var(--lime)]">شائعة</span>
            </h2>
            <div className="grid gap-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border border-white/10 bg-white/[0.02]"
                >
                  <summary className="ar flex cursor-pointer items-center justify-between p-5 text-base font-bold text-white" dir="rtl">
                    {f.q}
                    <span className="faq-chevron ml-4 text-[var(--lime)] transition-transform duration-300">
                      +
                    </span>
                  </summary>
                  <p className="ar border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/60" dir="rtl">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <p className="ar-display mb-4 text-2xl text-white md:text-3xl">
              جاهز تبدأ؟
            </p>
            <a
              href="/#distributors"
              className="cta-lime ar inline-flex items-center gap-3 rounded-full bg-[var(--lime)] px-8 py-4 font-black text-black"
            >
              تواصل معنا عالواتساب
              <span dir="ltr">←</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
