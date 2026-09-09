"use client";

import Image from "@/components/Img";
import styles from "./Lineup.module.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

type Product = {
  key: string;
  src: string;
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
};

const productData: Product[] = [
  {
    key: "extron-green",
    src: "/campaign/Green.png",
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
  },
  {
    key: "extron-pink",
    src: "/campaign/Pink.png",
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
  },
  {
    key: "for-us",
    src: "/campaign/Orange.png",
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
  },
  {
    key: "fizo",
    src: "/campaign/Grey.png",
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
  },
  {
    key: "cola-nova",
    src: "/campaign/Red.png",
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
  },
];

const lineupOrder = ["fizo", "extron-pink", "extron-green", "for-us", "cola-nova"];
const products = [...productData].sort((a, b) => lineupOrder.indexOf(a.key) - lineupOrder.indexOf(b.key));

export default function Lineup() {
  const [active, setActive] = useState<number | null>(null);
  const dirRef = useRef<1 | -1>(1);
  const section = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef(0);
  const opened = active !== null;

  const animateIn = useCallback(() => {
    const container = slideRef.current;
    if (!container) return;
    const d = dirRef.current;
    const photo = container.querySelector("[data-anim='photo']") as HTMLElement | null;
    const copyEls = container.querySelectorAll("[data-anim='copy'] > *");
    if (!photo && !copyEls.length) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (photo) {
      tl.fromTo(photo,
        { x: d * 80, opacity: 0, scale: 0.92, rotateY: d * 8 },
        { x: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.7 },
        0
      );
    }

    copyEls.forEach((el, i) => {
      tl.fromTo(el,
        { x: d * 40, opacity: 0, y: 10 },
        { x: 0, opacity: 1, y: 0, duration: 0.55 },
        0.08 + i * 0.07
      );
    });
  }, []);

  useEffect(() => {
    if (!opened) return;
    section.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => animateIn());
  }, [opened, active, animateIn]);

  const move = (index: number) => {
    const next = Math.max(0, Math.min(products.length - 1, index));
    if (next === active) return;
    dirRef.current = next > (active ?? 0) ? 1 : -1;
    setActive(next);
  };

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      move((active ?? 0) + (dx < 0 ? 1 : -1));
    }
    touchStart.current = null;
  }, [active, move]);

  return (
    <section id="products" ref={section} className={styles.section} data-detail={opened}>
      {!opened ? <>
        <header className={styles.heading}>
          <div>
            <h2 className="ar-display">تشكيلتنا الكاملة</h2>
            <p dir="ltr">THE LINEUP</p>
          </div>
          <p className="ar">اختر مشروبك واكتشف تفاصيله.</p>
        </header>
        <div className={styles.cards} dir="ltr">
          {products.map((p, i) => (
            <article className={styles.card} key={p.key} style={{ borderColor: p.accent + "55" }}>
              <button type="button" className={styles.photoButton} onClick={() => { returnTo.current = i; setActive(i); }} aria-label={`اكتشف ${p.en}`}>
                <Image src={p.src} alt={p.en} width={800} height={1000}
                  sizes="(min-width: 1000px) 19vw, 280px"
                  className={styles.photo} />
              </button>
              <div className={styles.caption}>
                <div><p className={styles.cardTag} dir="rtl">{p.arTag}</p><h3>{p.en}</h3></div>
                <button type="button" className={styles.explore} onClick={() => { returnTo.current = i; setActive(i); }} dir="rtl">
                  <span className="ar">استكشف</span><span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </> : <div className={styles.detail}>
        <div className={styles.toolbar}>
          <button className={styles.back} onClick={() => {
            const index = returnTo.current;
            setActive(null);
            requestAnimationFrame(() => section.current?.querySelectorAll<HTMLButtonElement>("article button")[index * 2]?.focus({ preventScroll: true }));
          }}>العودة للتشكيلة ↗</button>
          <span className="ar">اختر مشروبك من الأسهم أدناه</span>
          <span dir="ltr">{(active ?? 0) + 1} / {products.length}</span>
        </div>
        <div ref={slideRef} className={styles.rail} dir="ltr" role="region" aria-label="تفاصيل المشروبات"
          aria-roledescription="carousel" tabIndex={0}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
          onKeyDown={e => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault(); move((active ?? 0) + (e.key === "ArrowRight" ? 1 : -1));
            }
          }}
          >
          {products.filter((_, i) => i === active).map((p) => (
            <article key={p.key} className={styles.slide} data-active="true"
              aria-label={p.en} aria-roledescription="slide">
              <div className={styles.detailPhoto} data-anim="photo">
                <Image src={p.src} alt={p.en} width={800} height={1000}
                  sizes="(min-width: 760px) 40vw, 90vw" className={styles.detailImage} />
              </div>
              <div className={styles.copy} dir="rtl" data-anim="copy">
                <p className={styles.tag} style={{ color: p.accent }}>{p.arTag}</p>
                <h3 className="display" dir="ltr">{p.en}</h3>
                <p className={styles.description}>{p.arDesc}</p>
                <ul>{p.bullets.map(b => <li key={b.en}><span style={{ color: p.accent }}>+</span> {b.ar}</li>)}</ul>
                <dl>{p.stats.map(s => <div key={s.label}><dt>{s.arLabel}</dt><dd dir="ltr">{s.value}</dd></div>)}</dl>
              </div>
            </article>
          ))}
        </div>
        <nav className={styles.controls} aria-label="التنقل بين المشروبات" dir="ltr">
          <button onClick={() => move((active ?? 0) - 1)} disabled={active === 0} aria-label="المشروب السابق">←</button>
          <div>{products.map((p, i) => <button key={p.key} onClick={() => move(i)}
            aria-label={p.en} aria-current={active === i ? "true" : undefined}
            style={{ backgroundColor: active === i ? p.accent : undefined }} />)}</div>
          <button onClick={() => move((active ?? 0) + 1)} disabled={active === products.length - 1} aria-label="المشروب التالي">→</button>
        </nav>
      </div>}
    </section>
  );
}
