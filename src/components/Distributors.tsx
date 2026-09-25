"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";

const perks = [
  {
    ar: "هوامش تنافسية",
    en: "Competitive margins",
    desc: "أسعار الجملة مصممة لتترك ربحاً حقيقياً لك.",
  },
  {
    ar: "توصيل منتظم",
    en: "Reliable delivery",
    desc: "جدول توزيع أسبوعي يغطي فلسطين — بلا تأخير.",
  },
  {
    ar: "دعم تسويقي",
    en: "Marketing support",
    desc: "مواد عرض، لافتات، وعينات مجانية لمحلك أو مطعمك.",
  },
  {
    ar: "استرجاع مضمون",
    en: "Return guarantee",
    desc: "لا تقلق من المخزون — نسترجع ما لم يُبَع خلال شروط الاتفاق.",
  },
];

const WHATSAPP_NUMBER = "970569995095";

function buildWhatsAppUrl(
  shopName: string,
  phone: string,
  city: string,
  message: string,
) {
  const lines = [
    "مرحباً، أنا مهتم بالتعاون مع إكسترون.",
    "",
    `اسم المحل / الشركة: ${shopName}`,
    `رقم التواصل: ${phone}`,
    `المدينة: ${city}`,
  ];
  if (message.trim()) {
    lines.push(`ملاحظات: ${message}`);
  }
  lines.push("", "أرجو التواصل معي لمناقشة التفاصيل. شكراً لكم.");
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function Distributors() {
  const ref = useRef<HTMLElement | null>(null);
  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".dist-fade", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 65%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const canSubmit = shopName.trim() && phone.trim() && city;

  return (
    <section
      id="distributors"
      ref={ref}
      className="relative overflow-hidden bg-[var(--bg)] py-4 md:py-8"
    >
      <div className="relative mx-auto max-w-[1400px] px-3 sm:px-6 md:px-10">
        <div className="relative overflow-hidden rounded-2xl bg-[var(--lime)] p-5 sm:p-8 md:p-12 lg:p-16">
          {/* Diagonal stripes overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              background:
                "repeating-linear-gradient(-45deg, #000 0, #000 30px, transparent 30px, transparent 80px)",
            }}
          ></div>

          <div className="relative grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-20">
            {/* Left — pitch */}
            <div>
              <p className="dist-fade mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-black/70">
                <span className="h-px w-8 bg-black/70"></span>
                {"للتجار والموزعين · For Trade"}
              </p>
              <h2 className="dist-fade readex text-[12vw] leading-[0.9] text-black md:text-[6vw]">
                {"مهتم بالتوزيع؟"}
                <br />
                <span className="text-white">{"نحكيك."}</span>
              </h2>

              <div className="dist-fade ar mt-8 max-w-lg text-lg leading-loose text-black/80 md:text-xl" dir="rtl">
                <ScrollReveal baseOpacity={0.2} blurStrength={3} baseRotation={2}>
                  {"إذا عندك سوبرماركت، محل، كافيه أو مطعم — EXTRON علامة جاهزة تعطيك منتج قوي، حضور بصري لافت، وطلب حقيقي من الزبائن."}
                </ScrollReveal>
              </div>
              <p className="dist-fade mt-2 text-sm uppercase tracking-[0.2em] text-black/50">
                {"Supermarkets · shops · cafés · restaurants"}
              </p>

              <ul className="dist-fade mt-6 grid grid-cols-2 gap-3 md:mt-8 md:gap-4">
                {perks.map((p) => (
                  <li
                    key={p.en}
                    className="perk-card rounded-lg bg-white/20 p-4 backdrop-blur-sm md:p-5"
                  >
                    <p className="ar text-base font-bold text-black">{p.ar}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-black/50">
                      {p.en}
                    </p>
                    <p className="ar mt-3 text-sm leading-relaxed text-black/70">
                      {p.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — WhatsApp form */}
            <div className="dist-fade">
              <div className="rounded-xl bg-black p-8 md:p-10">
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[var(--lime)]">
                  {"تواصل معنا · Get in Touch"}
                </p>
                <p className="readex mb-8 text-2xl text-white md:text-3xl">
                  {"عبّي البيانات ونتواصل معك عالواتساب."}
                </p>

                <div className="grid gap-4">
                  <label className="grid gap-2">
                    <span className="ar text-xs text-white/60">{"اسم المحل أو الشركة"}</span>
                    <input
                      required
                      dir="rtl"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 focus:border-[var(--lime)] focus:outline-none"
                      placeholder="سوبرماركت ..."
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="ar text-xs text-white/60">{"رقم التواصل"}</span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 focus:border-[var(--lime)] focus:outline-none"
                      placeholder="+970 ..."
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="ar text-xs text-white/60">{"المدينة"}</span>
                    <select
                      required
                      dir="rtl"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="ar border border-white/15 bg-[#0d0f14] px-4 py-3 text-white focus:border-[var(--lime)] focus:outline-none"
                    >
                      <option value="" disabled style={{ background: "#0d0f14", color: "#999" }}>{"اختر مدينتك"}</option>
                      <option style={{ background: "#0d0f14", color: "#fff" }}>{"نابلس"}</option>
                      <option style={{ background: "#0d0f14", color: "#fff" }}>{"رام الله"}</option>
                      <option style={{ background: "#0d0f14", color: "#fff" }}>{"قلقيلية"}</option>
                      <option style={{ background: "#0d0f14", color: "#fff" }}>{"الخليل"}</option>
                      <option style={{ background: "#0d0f14", color: "#fff" }}>{"جنين"}</option>
                      <option style={{ background: "#0d0f14", color: "#fff" }}>{"طولكرم"}</option>
                      <option style={{ background: "#0d0f14", color: "#fff" }}>{"بيت لحم"}</option>
                      <option style={{ background: "#0d0f14", color: "#fff" }}>{"أخرى"}</option>
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="ar text-xs text-white/60">{"رسالة قصيرة (اختياري)"}</span>
                    <textarea
                      dir="rtl"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 focus:border-[var(--lime)] focus:outline-none"
                      placeholder="نوع المحل، الكميات المتوقعة، أي سؤال..."
                    />
                  </label>
                  <a
                    href={canSubmit ? buildWhatsAppUrl(shopName, phone, city, message) : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!canSubmit) e.preventDefault();
                    }}
                    className={`mt-2 inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 font-black transition-all ${
                      canSubmit
                        ? "bg-[var(--lime)] text-black hover:bg-[var(--lime-glow)] hover:shadow-[0_10px_40px_rgba(166,236,47,0.4)]"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    <span className="ar">{"أرسل عبر واتساب"}</span>
                    <span>{"←"}</span>
                  </a>
                  <p className="ar text-center text-[10px] text-white/30">
                    {"سيتم فتح واتساب برسالة جاهزة تحتوي على بياناتك"}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4 border-t border-white/10 pt-6">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 font-bold text-[var(--lime)] transition-all hover:bg-white/20"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--lime)]"></span>
                    <span className="ar">{"واتساب مباشر"}</span>
                    <span>{"→"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
