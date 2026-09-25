export type Pack = { size: number; label: string; price: number; discount?: string; img?: string };

export type Product = {
  key: string;
  src: string;
  detailSrc?: string;
  en: string;
  ar: string;
  tag: string;
  arTag: string;
  desc: string;
  arDesc: string;
  accent: string;
  cardBg: string;
  bullets: { en: string; ar: string }[];
  stats: { label: string; value: string; arLabel: string }[];
  packs: Pack[];
  gallery?: string[];
};

export const productData: Product[] = [
  {
    key: "fizo",
    src: "/brand/drink-grey.png",
    en: "FIZO · Lemon-Lime",
    ar: "فيزو",
    tag: "New Generation Soda",
    arTag: "صودا الجيل الجديد",
    desc: "Clean lemon-lime, enough fizz.",
    arDesc: "بدون مواد حافظة. بدون ألوان اصطناعية. فقط نكهة ليمون نظيفة وفقاعات كافية لتنعشك.",
    accent: "#c8ff5a",
    cardBg: "#1a2a0f",
    bullets: [
      { en: "No preservatives", ar: "بدون مواد حافظة" },
      { en: "No artificial colors", ar: "بدون ألوان اصطناعية" },
      { en: "Natural flavor", ar: "نكهة طبيعية" },
    ],
    stats: [
      { label: "Volume", arLabel: "الحجم", value: "330ml" },
      { label: "Style", arLabel: "النوع", value: "Soda" },
      { label: "Origin", arLabel: "المنشأ", value: "Palestine" },
    ],
    packs: [
      { size: 6, label: "6 عبوات", price: 25 },
      { size: 12, label: "12 عبوة", price: 45, discount: "وفّر 10%" },
      { size: 24, label: "24 عبوة", price: 82, discount: "وفّر 18%" },
    ],
  },
  {
    key: "extron-pink",
    src: "/brand/drink-pink.png",
    en: "EXTRON for Women",
    ar: "إكسترون للسيدات",
    tag: "Berry × Vitamins",
    arTag: "بنكهة الفراولة والتوت",
    desc: "Energy designed for her.",
    arDesc: "طاقة صُممت خصيصاً لكِ. مضادات أكسدة، فيتامين B6 وB12، زنك وفيتامين D. بنكهة الفراولة والتوت — بدون تنازلات.",
    accent: "#f0338d",
    cardBg: "#3a0820",
    bullets: [
      { en: "B6 + B12", ar: "فيتامين B6 وB12" },
      { en: "Antioxidants", ar: "مضادات أكسدة" },
      { en: "Zinc + Vitamin D", ar: "زنك وفيتامين D" },
    ],
    stats: [
      { label: "Caffeine", arLabel: "كافيين", value: "80mg" },
      { label: "Sugar", arLabel: "سكر", value: "0g" },
      { label: "Volume", arLabel: "الحجم", value: "250ml" },
    ],
    packs: [
      { size: 6, label: "6 عبوات", price: 28 },
      { size: 12, label: "12 عبوة", price: 50, discount: "وفّر 11%" },
      { size: 24, label: "24 عبوة", price: 90, discount: "وفّر 20%" },
    ],
  },
  {
    key: "extron-green",
    src: "/brand/drink-green.png",
    detailSrc: "/brand/DAMN1.png",
    en: "EXTRON Original",
    ar: "إكسترون الأخضر",
    tag: "Clean Energy · Signature",
    arTag: "الأصلي · بداية الحكاية",
    desc: "Real energy from real sources.",
    arDesc: "طاقة حقيقية من مصادر حقيقية. كافيين نباتي، توراين، فيتامينات ب، جينسنغ وغوارانا — صُنعت للأداء، لا للانهيار السريع.",
    accent: "#a6ec2f",
    cardBg: "#1b3a08",
    bullets: [
      { en: "Plant caffeine", ar: "كافيين نباتي" },
      { en: "Zero added sugar", ar: "بدون سكر مضاف" },
      { en: "Ginseng + guarana", ar: "جينسنغ وغوارانا" },
    ],
    stats: [
      { label: "Caffeine", arLabel: "كافيين", value: "108mg" },
      { label: "Sugar", arLabel: "سكر", value: "0g" },
      { label: "Volume", arLabel: "الحجم", value: "250ml" },
    ],
    packs: [
      { size: 6, label: "6 عبوات", price: 30, img: "/brand/6pack.png" },
      { size: 12, label: "12 عبوة", price: 54, discount: "وفّر 10%", img: "/brand/12pack.png" },
      { size: 24, label: "24 عبوة", price: 96, discount: "وفّر 20%", img: "/brand/24pack.jpg" },
    ],
    gallery: ["/lifestyle/pic3.jpg", "/lifestyle/pic5.jpg"],
  },
  {
    key: "for-us",
    src: "/brand/drink-orange.png",
    en: "FOR US · Orange",
    ar: "فور أص",
    tag: "Sparkling Orange Soda",
    arTag: "صودا برتقال منعشة",
    desc: "Crisp, refreshing, honest.",
    arDesc: "منعش، حلو، صريح. صودا برتقال بنكهة فاكهة حقيقية — لكل لحظة استراحة قصيرة.",
    accent: "#ff7a1a",
    cardBg: "#3a1f08",
    bullets: [
      { en: "Real orange", ar: "طعم برتقال حقيقي" },
      { en: "Crisp + light", ar: "منعش وخفيف" },
      { en: "For everyone", ar: "لكل الأعمار" },
    ],
    stats: [
      { label: "Volume", arLabel: "الحجم", value: "330ml" },
      { label: "Style", arLabel: "النوع", value: "Soda" },
      { label: "Best", arLabel: "الأفضل", value: "Cold" },
    ],
    packs: [
      { size: 6, label: "6 عبوات", price: 22 },
      { size: 12, label: "12 عبوة", price: 40, discount: "وفّر 9%" },
      { size: 24, label: "24 عبوة", price: 72, discount: "وفّر 18%" },
    ],
  },
  {
    key: "cola-nova",
    src: "/brand/drink-red.png",
    en: "COLA NOVA",
    ar: "كولا نوفا",
    tag: "New Generation Cola",
    arTag: "الجيل الجديد من الكولا",
    desc: "Cola like you haven't had before.",
    arDesc: "كولا كما لم تشربها من قبل. طعم عميق، فقاعات قوية، طاقة مختلفة — الكولا اللي كنت تستناها.",
    accent: "#e5222b",
    cardBg: "#3a0808",
    bullets: [
      { en: "Modern classic", ar: "كلاسيكي محدّث" },
      { en: "Bold fizz", ar: "فقاعات قوية" },
      { en: "Best served cold", ar: "بارد على الدوام" },
    ],
    stats: [
      { label: "Volume", arLabel: "الحجم", value: "330ml" },
      { label: "Style", arLabel: "النوع", value: "Cola" },
      { label: "Best", arLabel: "الأفضل", value: "Cold" },
    ],
    packs: [
      { size: 6, label: "6 عبوات", price: 24 },
      { size: 12, label: "12 عبوة", price: 42, discount: "وفّر 12%" },
      { size: 24, label: "24 عبوة", price: 78, discount: "وفّر 19%" },
    ],
  },
];

export const lineupOrder = ["fizo", "extron-pink", "extron-green", "for-us", "cola-nova"];
export const products = [...productData].sort(
  (a, b) => lineupOrder.indexOf(a.key) - lineupOrder.indexOf(b.key)
);

export const WHATSAPP_NUMBER = "970569995095";
