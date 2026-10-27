export type Pack = { size: number; label: string; price: number; discount?: string; img?: string; comingSoon?: boolean };

export type Ingredient = { ar: string; en: string; amount: string };

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
  descTitle?: string;
  accent: string;
  cardBg: string;
  bullets: { en: string; ar: string }[];
  stats: { label: string; value: string; arLabel: string }[];
  packs: Pack[];
  gallery?: string[];
  ingredients?: Ingredient[];
  ingredientImage?: string;
};

export const productData: Product[] = [
  {
    key: "fizo",
    src: "/brand/soloo/CIZO Chilled Fizzy Drink Can.png",
    detailSrc: "/brand/111.png",
    en: "FIZO · Lemon-Lime",
    ar: "فيزو",
    tag: "New Generation Soda",
    arTag: "صودا الجيل الجديد",
    desc: "Clean lemon-lime, enough fizz.",
    arDesc: "مشروب غازي بنكهة الفواكه المختلطة، بمذاق فاكهي وفقاعات منعشة. تحتوي العبوة على 105 سعرات حرارية، ويُقدَّم باردًا مع الوجبات أو بمفرده.",
    descTitle: "فيزو | Fizo Gazoz — 250 مل",
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
      { size: 6, label: "6 عبوات", price: 0, img: "/brand/packs/fizo-6.jpg", comingSoon: true },
      { size: 24, label: "24 عبوة", price: 48, img: "/brand/packs/fizo-24.jpg" },
    ],
    gallery: ["/lifestyle/pic7.jpg", "/lifestyle/pic1.jpg"],
    ingredientImage: "/brand/info/fizo.jpg",
    ingredients: [
      { ar: "نكهة ليمون طبيعية", en: "Natural Lemon Flavor", amount: "—" },
      { ar: "بدون مواد حافظة", en: "No Preservatives", amount: "0" },
      { ar: "بدون ألوان اصطناعية", en: "No Artificial Colors", amount: "0" },
    ],
  },
  {
    key: "extron-pink",
    src: "/brand/soloo/Wet EXTRON Magenta Energy Can.png",
    detailSrc: "/brand/444.png",
    en: "EXTRON for Women",
    ar: "إكسترون للسيدات",
    tag: "Berry × Vitamins",
    arTag: "بنكهة الفراولة والتوت",
    desc: "Energy designed for her.",
    arDesc: "مشروب طاقة غازي بنكهة الفراولة والكيوي، يجمع الكافيين الطبيعي مع الغوارانا والمتّة ومستخلص الجنسنغ وإل-كارنيتين. مُحلّى بالسكر ونبتة الستيفيا، وتحتوي العبوة على 37.5 ملغ من الكافيين، و17.5 غ من السكر، و70 سعرة حرارية. خالٍ من المواد الحافظة، ويُقدَّم باردًا.",
    descTitle: "إكسترون الزهري | EXTRON For Women — 250 مل",
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
      { size: 6, label: "6 عبوات", price: 0, img: "/brand/packs/extron-pink-6.jpg", comingSoon: true },
      { size: 24, label: "24 عبوة", price: 62, img: "/brand/packs/extron-pink-24.jpg" },
    ],
    gallery: ["/brand/women-fruit.png", "/brand/women-beach.png"],
    ingredientImage: "/brand/info/extron-pink.jpg",
    ingredients: [
      { ar: "كافيين نباتي", en: "Plant Caffeine", amount: "80mg" },
      { ar: "فيتامين B6 + B12", en: "Vitamin B6 + B12", amount: "مركّب" },
      { ar: "مضادات أكسدة", en: "Antioxidants", amount: "—" },
      { ar: "زنك + فيتامين D", en: "Zinc + Vitamin D", amount: "—" },
      { ar: "بدون سكر مضاف", en: "Zero Added Sugar", amount: "0g" },
    ],
  },
  {
    key: "extron-green",
    src: "/brand/soloo/Chilled EXTRON Energy Drink Can.png",
    detailSrc: "/brand/DAMN1.png",
    en: "EXTRON Original",
    ar: "إكسترون الأخضر",
    tag: "Clean Energy · Signature",
    arTag: "الأصلي · بداية الحكاية",
    desc: "Real energy from real sources.",
    arDesc: "مشروب طاقة غازي بكافيين طبيعي من مصادر نباتية، مع الغوارانا والمتّة ومستخلص الجنسنغ وإل-كارنيتين. تحتوي العبوة على 37.5 ملغ من الكافيين، و27 غ من السكر، ونحو 108 سعرات حرارية. خالٍ من المواد الحافظة، ويُقدَّم باردًا.",
    descTitle: "إكسترون الأخضر | EXTRON Original — 250 مل",
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
      { size: 6, label: "6 عبوات", price: 0, img: "/brand/6pack.png", comingSoon: true },
      { size: 24, label: "24 عبوة", price: 62, img: "/brand/24pack.jpg" },
    ],
    gallery: ["/brand/green-fruit.png", "/lifestyle/pic3.jpg", "/lifestyle/pic5.jpg"],
    ingredientImage: "/brand/info/extron-green.jpg",
    ingredients: [
      { ar: "كافيين نباتي", en: "Plant Caffeine", amount: "108mg" },
      { ar: "توراين", en: "Taurine", amount: "1000mg" },
      { ar: "جينسنغ", en: "Ginseng", amount: "50mg" },
      { ar: "غوارانا", en: "Guarana", amount: "40mg" },
      { ar: "فيتامينات ب المركّبة", en: "B-Vitamins", amount: "مركّب" },
      { ar: "بدون سكر مضاف", en: "Zero Added Sugar", amount: "0g" },
    ],
  },
  {
    key: "for-us",
    src: "/brand/soloo/Condensed Orange Soda Can with Citrus Graphics.png",
    detailSrc: "/brand/222.png",
    en: "FOR US · Orange",
    ar: "فور أص",
    tag: "Sparkling Orange Soda",
    arTag: "صودا برتقال منعشة",
    desc: "Crisp, refreshing, honest.",
    arDesc: "مشروب غازي بنكهة البرتقال مع فيتامين C، يجمع المذاق الفاكهي والفقاعات المنعشة. ويُقدَّم باردًا للاستمتاع بأفضل مذاق.",
    descTitle: "فور أس برتقال | FOR US Orange — 250 مل",
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
      { size: 6, label: "6 عبوات", price: 0, img: "/brand/packs/for-us-6.jpg", comingSoon: true },
      { size: 24, label: "24 عبوة", price: 48, img: "/brand/packs/for-us-24.jpg" },
    ],
    gallery: ["/lifestyle/pic9.jpg", "/lifestyle/pic1.jpg"],
    ingredientImage: "/brand/info/for-us.jpg",
    ingredients: [
      { ar: "نكهة برتقال طبيعية", en: "Natural Orange Flavor", amount: "—" },
      { ar: "بدون مواد حافظة", en: "No Preservatives", amount: "0" },
      { ar: "بدون ألوان اصطناعية", en: "No Artificial Colors", amount: "0" },
    ],
  },
  {
    key: "cola-nova",
    src: "/brand/soloo/Dewy Red Cola Can Advertisement.png",
    detailSrc: "/brand/333.png",
    en: "COLA NOVA",
    ar: "كولا نوفا",
    tag: "New Generation Cola",
    arTag: "الجيل الجديد من الكولا",
    desc: "Cola like you haven't had before.",
    arDesc: "مشروب غازي بنكهة الكولا، يُقدَّم باردًا لمذاق منعش. تحتوي العبوة على 37.5 ملغ من الكافيين، و27.5 غ من السكر، ونحو 108 سعرات حرارية.",
    descTitle: "كولا نوفا | Cola Nova — 250 مل",
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
      { size: 6, label: "6 عبوات", price: 0, img: "/brand/6pack.png", comingSoon: true },
      { size: 24, label: "24 عبوة", price: 35, img: "/brand/24pack.jpg" },
    ],
    gallery: ["/lifestyle/pic8.jpg", "/lifestyle/pic1.jpg"],
    ingredientImage: "/brand/info/cola-nova.jpg",
    ingredients: [
      { ar: "نكهة كولا طبيعية", en: "Natural Cola Flavor", amount: "—" },
      { ar: "فقاعات طبيعية", en: "Natural Carbonation", amount: "—" },
      { ar: "بدون مواد حافظة", en: "No Preservatives", amount: "0" },
    ],
  },
];

export const lineupOrder = ["fizo", "extron-pink", "extron-green", "for-us", "cola-nova"];
export const products = [...productData].sort(
  (a, b) => lineupOrder.indexOf(a.key) - lineupOrder.indexOf(b.key)
);

export const WHATSAPP_NUMBER = "970569995095";
