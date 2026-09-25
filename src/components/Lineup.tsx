"use client";

import Image from "@/components/Img";
import styles from "./Lineup.module.css";
import { products } from "@/data/products";

export default function Lineup() {
  return (
    <section id="products" className={styles.section}>
      <header className={styles.heading}>
        <div>
          <h2 className="readex">تشكيلتنا الكاملة</h2>
          <p className="space" style={{ fontWeight: 600, letterSpacing: "-0.02em" }} dir="ltr">THE LINEUP</p>
        </div>
        <p className="readex">اختر مشروبك واكتشف تفاصيله.</p>
      </header>
      <div className={styles.cards} dir="ltr">
        {products.map((p) => (
          <article className={styles.card} key={p.key} style={{ borderColor: p.accent + "55" }}>
            <a href={`/extron-web/products/${p.key}`} className={styles.photoButton} aria-label={`اكتشف ${p.en}`}>
              <Image src={p.src} alt={p.en} width={800} height={1000}
                sizes="(min-width: 1000px) 19vw, 280px"
                className={styles.photo} />
            </a>
            <div className={styles.caption}>
              <div><p className={`${styles.cardTag} readex`} dir="rtl">{p.arTag}</p><h3 className="space">{p.en}</h3></div>
              <a href={`/extron-web/products/${p.key}`} className={`${styles.explore} readex`} dir="rtl">
                <span>استكشف</span><span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
