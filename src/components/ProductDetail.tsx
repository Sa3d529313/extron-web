"use client";

import Image from "@/components/Img";
import { useState, type CSSProperties } from "react";
import styles from "./ProductDetail.module.css";
import { products, WHATSAPP_NUMBER, type Product } from "@/data/products";

function RelatedCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className={`${styles.related} group rounded-none border border-black/8 bg-neutral-50 p-4 text-left md:p-5`} style={{ "--product-accent": product.accent } as CSSProperties}>
      <div className="mb-4 flex h-44 items-center justify-center md:h-56">
        <Image
          src={product.src}
          alt={product.en}
          width={400}
          height={560}
          className={`${styles.relatedImage} h-40 max-w-full w-auto object-contain md:h-48`}
        />
      </div>
      <p className="space text-sm font-bold uppercase text-black/80 md:text-base">
        {product.en}
      </p>
      <p className="readex mt-2 text-xs text-black/50 md:text-sm">{product.ar}</p>
    </button>
  );
}

export default function ProductDetail({
  initialIndex,
}: {
  initialIndex: number;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [selectedPack, setSelectedPack] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const p = products[current];
  const pack = p.packs[selectedPack];

  const gallery = [
    { src: p.detailSrc || p.src, label: p.en },
    ...(p.gallery || []).map((src) => ({ src, label: p.en })),
  ];

  const whatsappMsg = encodeURIComponent(
    `مرحباً، أنا مهتم بطلب ${p.ar} (${p.en}) — ${pack.label}`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  const related = products.filter((_, i) => i !== current);

  const switchProduct = (i: number) => {
    window.location.href = `/extron-web/products/${products[i].key}`;
  };

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-6 pt-24 pb-14 md:px-10 md:pt-26 md:pb-20" style={{ "--product-accent": p.accent } as CSSProperties}>
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex items-center gap-2 text-xs text-black/35"
          dir="rtl"
        >
          <a
            href="/extron-web/"
            className="readex transition-colors hover:text-black/60"
          >
            الرئيسية
          </a>
          <span>›</span>
          <a
            href="/extron-web/#products"
            className="readex transition-colors hover:text-black/60"
          >
            المنتجات
          </a>
          <span>›</span>
          <span className="readex text-black/60">{p.ar}</span>
        </nav>

        {/* ─── MAIN LAYOUT ─── */}
        <div dir="ltr" className="grid items-start gap-8 md:grid-cols-[1.5fr_1fr] md:gap-4 lg:gap-5">
          {/* Product image with thumbnails at the top-left */}
          <div className="min-w-0 md:pr-6">
            <div className="mx-auto flex w-full items-start gap-0 md:mr-auto md:ml-0 md:gap-10" style={{ maxWidth: "calc(clamp(400px, 72vh, 760px) * 1153 / 1364 + 149px)" }}>
              {/* Main image — fixed height container so layout doesn't shift */}
              <div
                className="relative flex aspect-[1153/1364] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-3xl"
              >
                {gallery.map((img, i) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.label}
                    width={800}
                    height={1000}
                    priority={i === 0}
                    sizes="(min-width: 768px) 48vw, 85vw"
                    className="absolute inset-0 h-full w-full rounded-3xl object-contain transition-opacity duration-500 ease-in-out"
                    style={{
                      opacity: activeImg === i ? 1 : 0,
                      pointerEvents: activeImg === i ? "auto" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Vertical thumbnail strip — hidden on mobile */}
              <div className="order-first hidden shrink-0 flex-col gap-3 md:flex">
                {gallery.length > 1 ? (
                  gallery.map((img, i) => (
                    <button
                      key={img.src}
                      onClick={() => setActiveImg(i)}
                      aria-pressed={activeImg === i}
                      className={`${styles.thumbnail} h-24 w-24 rounded-2xl border p-1 lg:h-[109px] lg:w-[109px]`}
                      style={{
                        borderColor:
                          i === activeImg ? "#a6ec2f" : "rgba(0,0,0,0.08)",
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.label}
                        width={320}
                        height={320}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    </button>
                  ))
                ) : (
                  <div className="h-24 w-24 lg:h-[109px] lg:w-[109px]" />
                )}
              </div>
            </div>
          </div>

          {/* Product details — open typography with a single pack selection surface */}
          <div
            dir="rtl"
            className="p-6 pt-5 md:-translate-x-4 md:py-6 md:pl-0 md:pr-6"
          >
            {/* Tag line */}
            <p
              className="space mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/75"
              dir="ltr"
            >
              <span aria-hidden="true" className="h-px w-5 shrink-0 bg-black/75" />
              {p.tag}
            </p>

            {/* Product name */}
            <h1
              className="space font-bold uppercase text-black"
              dir="ltr"
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {p.en}
            </h1>

            {/* Arabic name */}
            <p className="readex mt-3 text-2xl leading-relaxed font-bold text-black/80">
              {p.ar}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3" dir="ltr">
              <span className="space text-[28px] font-bold" style={{ color: "#1a7a2e" }}>
                ₪{pack.price}
              </span>
              {pack.discount && (
                <span className="readex rounded-full px-3 py-1 text-[11px] font-semibold text-black/80" style={{ backgroundColor: "#a6ec2f30" }}>
                  {pack.discount}
                </span>
              )}
            </div>

            {/* Stats */}
            <div
              className="my-6 grid grid-cols-3 gap-4"
              dir="ltr"
            >
              {p.stats.map((s) => (
                <div
                  key={s.label}
                  className="text-left"
                >
                  <p className="space text-[10px] font-medium uppercase tracking-wider text-black/50">
                    {s.label}
                  </p>
                  <p className="space mt-1 text-lg font-semibold text-black">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-black/8" />

            <div className="mb-4 flex items-center justify-between">
              <p className="readex text-sm font-semibold text-black">اختر العبوة</p>
              <p className="space text-[10px] uppercase tracking-[0.15em] text-black/40">SELECT PACK</p>
            </div>
            <div className="relative grid grid-cols-3 gap-1 rounded-2xl bg-neutral-100/80 p-1.5">
              {/* Sliding selection indicator */}
              <div
                className="pointer-events-none absolute rounded-xl bg-white"
                style={{
                  width: "calc((100% - 20px) / 3)",
                  height: "calc(100% - 12px)",
                  top: "6px",
                  right: "6px",
                  transform: `translateX(calc(${selectedPack} * (-100% - 4px)))`,
                  transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: "0 2px 12px #00000008, inset 0 -3px 0 #a6ec2f",
                }}
              />
              {p.packs.map((pk, i) => {
                const active = selectedPack === i;
                return (
                  <button
                    key={pk.size}
                    onClick={() => setSelectedPack(i)}
                    aria-pressed={active}
                    className={`${styles.pack} relative z-10 flex min-w-0 flex-col items-center rounded-xl px-2 py-3 text-center`}
                  >
                    <span className="readex text-xs font-semibold text-black/75">{pk.label}</span>
                    {pk.img && (
                      <Image
                        src={pk.img}
                        alt={`${p.en} — ${pk.label}`}
                        width={200}
                        height={150}
                        className="my-3 h-14 w-full object-contain mix-blend-multiply"
                      />
                    )}
                    <span className="space mt-2 text-lg font-bold" dir="ltr" style={{ color: "#1a7a2e" }}>₪{pk.price}</span>
                    <span className="readex mt-2 min-h-5 text-[10px] font-medium text-black/60">
                      {pk.discount || "العبوة الأساسية"}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-2 flex h-4 w-4 items-center justify-center rounded-full border"
                      style={{ borderColor: active ? "#a6ec2f" : "#00000025", backgroundColor: active ? "#a6ec2f" : "transparent" }}
                    >
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.cta} ${styles.whatsappGlow} mt-5 flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-black`}
              style={{ backgroundColor: p.accent, "--glow-color": p.accent } as CSSProperties}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="readex text-sm font-bold">
                اطلب عبر واتساب
              </span>
            </a>

            <p className="readex mt-3 text-center text-[11px] text-black/45">
              تواصل مباشرة مع فريق المبيعات للطلب والاستفسار
            </p>

            <div className="readex mt-7 space-y-3 text-[13px] leading-[2] text-black/65">
              {p.key === "extron-green" ? (
                <>
                  <p>
                    بطعم لذيذ وروح مستوحاة من الطبيعة، يجمع إكسترون بين الكافيين النباتي الطبيعي والجينسنغ والغوارانا والمتّة. تركيبة ترافق إيقاع يومك، من ساعات الدراسة والعمل إلى لحظات النشاط والتحدّي.
                  </p>
                  <p>
                    طاقة من مصادر نباتية، وتجربة تتجاوز المذاق التقليدي لمشروبات الطاقة. وتقدّم عائلة إكسترون نكهات متنوعة، منها <strong className="font-semibold text-black/85">الليمون والمانجو والكيوي</strong>، لتجد الطعم الذي يشبهك.
                  </p>
                  <p className="readex text-base font-bold text-black">إكسترون — استمدّ طاقتك من الطبيعة!</p>
                </>
              ) : (
                <p>{p.arDesc}</p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ─── RELATED PRODUCTS ─── */}
      <div className="border-t border-black/8">
        <div className="mx-auto max-w-[1300px] px-6 py-12 md:px-12 md:py-16">
          <div className="mb-6 flex items-center justify-between">
            <p
              className="space text-[13px] font-medium uppercase tracking-[0.15em] text-black/40"
              dir="ltr"
            >
              YOU MIGHT ALSO LIKE
            </p>
            <a
              href="/extron-web/#products"
              className="space text-[11px] font-medium uppercase tracking-[0.1em] text-black/25 transition-colors hover:text-black/50"
              dir="ltr"
            >
              View all →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {related.map((prod) => (
              <RelatedCard
                key={prod.key}
                product={prod}
                onClick={() => switchProduct(products.indexOf(prod))}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
