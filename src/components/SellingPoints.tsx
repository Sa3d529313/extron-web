"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import {
  CITIES,
  SELLING_POINTS,
  POINT_TYPE_LABELS,
  googleMapsUrl,
  type SellingPoint,
} from "@/data/sellingPoints";
import { WHATSAPP_NUMBER } from "@/data/products";
import "./SellingPointsMap.css";

const SellingPointsMap = dynamic(() => import("./SellingPointsMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-[var(--bg-2)]">
      <span className="ar text-sm text-white/40">جاري تحميل الخريطة…</span>
    </div>
  ),
});

const NAV_OFFSET = -110;

const pointCountByCity = SELLING_POINTS.reduce<Record<string, number>>((acc, p) => {
  acc[p.cityId] = (acc[p.cityId] ?? 0) + 1;
  return acc;
}, {});

const citiesWithPoints = CITIES.filter((c) => pointCountByCity[c.id]);
const citiesWithoutPoints = CITIES.filter((c) => !pointCountByCity[c.id]);

export default function SellingPoints() {
  const [cityId, setCityId] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();

  const city = useMemo(() => CITIES.find((c) => c.id === cityId) ?? null, [cityId]);
  const visiblePoints = useMemo(
    () => (city ? SELLING_POINTS.filter((p) => p.cityId === city.id) : SELLING_POINTS),
    [city],
  );
  // Derived, so a stale selection from another city can never show.
  const selected = useMemo(
    () => visiblePoints.find((p) => p.id === selectedId) ?? null,
    [visiblePoints, selectedId],
  );

  // Bumped to ask for a scroll to the map; handled after React has re-rendered,
  // so the map's final position (e.g. after the "all cities" button appears) is used.
  const [scrollRequest, setScrollRequest] = useState(0);
  const requestScrollToMap = () => setScrollRequest((n) => n + 1);

  useEffect(() => {
    if (scrollRequest === 0) return;
    const el = mapSectionRef.current;
    if (!el) return;
    // Hidden tabs pause animation frames (and Lenis), so jump natively there.
    if (lenis && !document.hidden) {
      lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.2 });
    } else {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET,
        behavior: document.hidden ? "auto" : "smooth",
      });
    }
    // Only a new request should scroll — not Lenis becoming available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRequest]);

  const handleCityChange = (id: string) => {
    setSelectedId(null);
    setCityId(id);
    requestScrollToMap();
  };

  const handleMarkerSelect = useCallback((id: string) => {
    const point = SELLING_POINTS.find((p) => p.id === id);
    if (!point) return;
    setCityId(point.cityId);
    setSelectedId(id);
  }, []);

  const closeCard = useCallback(() => setSelectedId(null), []);

  const handleListSelect = (id: string) => {
    setSelectedId(id);
    requestScrollToMap();
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-16 md:px-10 md:pb-28" dir="rtl">
      {/* City picker */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <label className="block w-full md:max-w-md">
          <span className="ar mb-2 block text-sm font-bold text-white/70">اختر مدينتك</span>
          <span className="relative block">
            <select
              value={cityId}
              onChange={(e) => handleCityChange(e.target.value)}
              className="ar w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-[var(--bg-2)] py-4 pr-5 pl-12 text-base font-bold text-white transition-colors outline-none hover:border-[var(--lime)] focus:border-[var(--lime)]"
            >
              <option value="" disabled>
                — اختر المدينة —
              </option>
              <optgroup label="مدن فيها نقاط بيع">
                {citiesWithPoints.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({pointCountByCity[c.id]})
                  </option>
                ))}
              </optgroup>
              {citiesWithoutPoints.length > 0 && (
                <optgroup label="قريباً">
                  {citiesWithoutPoints.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[var(--lime)]"
            >
              ▾
            </span>
          </span>
        </label>

        {city && (
          <button
            type="button"
            onClick={() => handleCityChange("")}
            className="ar self-start text-sm text-white/50 underline-offset-4 transition-colors hover:text-[var(--lime)] hover:underline md:self-auto"
          >
            عرض كل المدن
          </button>
        )}
      </div>

      {/* Map */}
      <div
        ref={mapSectionRef}
        className="relative isolate mt-8 h-[65svh] min-h-[440px] overflow-hidden rounded-2xl border border-white/10 md:h-[min(640px,calc(100svh-130px))]"
      >
        <SellingPointsMap
          cities={CITIES}
          city={city}
          points={visiblePoints}
          selectedId={selected?.id ?? null}
          onSelect={handleMarkerSelect}
          onBackgroundClick={closeCard}
        />

        {!city && (
          <div className="pointer-events-none absolute top-4 right-4 left-4 z-[1000] flex justify-center md:left-auto">
            <p className="ar rounded-full bg-black/75 px-4 py-2 text-sm text-white/80 backdrop-blur">
              اختر مدينتك من القائمة، أو اضغط على أي نقطة في الخريطة
            </p>
          </div>
        )}

        {city && visiblePoints.length === 0 && <EmptyCityCard cityName={city.name} />}

        {selected && <PointCard key={selected.id} point={selected} onClose={closeCard} />}
      </div>

      {/* List of the city's points */}
      {city && visiblePoints.length > 0 && (
        <div className="mt-10">
          <h2 className="readex text-2xl text-white md:text-3xl">
            نقاط البيع في <span className="text-[var(--lime)]">{city.name}</span>
            <span className="ar mr-3 align-middle text-base text-white/40">({visiblePoints.length})</span>
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePoints.map((p) => {
              const active = p.id === selected?.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => handleListSelect(p.id)}
                    aria-pressed={active}
                    className={`ar flex w-full items-start justify-between gap-3 rounded-xl border p-4 text-right transition-colors ${
                      active
                        ? "border-[var(--pink)] bg-[var(--pink)]/10"
                        : "border-white/10 bg-white/[0.02] hover:border-[var(--lime)]"
                    }`}
                  >
                    <span>
                      <span className="block font-bold text-white">{p.name}</span>
                      <span className="mt-1 block text-sm text-white/50">{p.area}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-xs text-[var(--lime)]">
                      {POINT_TYPE_LABELS[p.type]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

function PointCard({ point, onClose }: { point: SellingPoint; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const city = CITIES.find((c) => c.id === point.cityId);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      role="dialog"
      aria-label={point.name}
      data-lenis-prevent
      className="sp-card absolute inset-x-3 bottom-3 z-[1100] max-h-[60%] overflow-y-auto rounded-2xl border border-white/10 bg-[rgba(5,6,10,0.96)] shadow-2xl backdrop-blur md:inset-x-auto md:top-4 md:right-4 md:bottom-auto md:max-h-[calc(100%-2rem)] md:w-[360px]"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="إغلاق"
        className="absolute top-3 left-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/75 text-base text-white transition-colors hover:bg-[var(--lime)] hover:text-black"
      >
        ✕
      </button>

      {point.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={encodeURI(point.image)}
          alt={point.name}
          className="h-40 w-full object-cover md:h-48"
          loading="lazy"
        />
      )}

      <div className="p-5 pl-14">
        <span className="ar inline-block rounded-full bg-[var(--lime)]/15 px-3 py-1 text-xs font-bold text-[var(--lime)]">
          {POINT_TYPE_LABELS[point.type]}
        </span>
        <h3 className="readex mt-3 text-xl leading-snug text-white">{point.name}</h3>

        <dl className="ar mt-4 space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="shrink-0 text-white/40">الموقع:</dt>
            <dd className="text-white/80">
              {city ? `${city.name} — ` : ""}
              {point.area}
            </dd>
          </div>
          {point.hours && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-white/40">ساعات العمل:</dt>
              <dd className="text-white/80">{point.hours}</dd>
            </div>
          )}
          {point.phones && point.phones.length > 0 && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-white/40">الهاتف:</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1">
                {point.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    dir="ltr"
                    className="text-white/80 hover:text-[var(--lime)]"
                  >
                    {phone}
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <a
          href={googleMapsUrl(point)}
          target="_blank"
          rel="noopener noreferrer"
          className="ar mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--lime)] px-4 py-3 text-sm font-black text-black transition-transform hover:scale-[1.02]"
        >
          <span>الاتجاهات على Google Maps</span>
          <span dir="ltr">↗</span>
        </a>
        {!point.exact && !point.mapsUrl && (
          <p className="ar mt-2 text-center text-xs text-white/35">
            الموقع على الخريطة تقريبي — استخدم زر الاتجاهات للوصول بدقة
          </p>
        )}
      </div>
    </div>
  );
}

function EmptyCityCard({ cityName }: { cityName: string }) {
  const text = encodeURIComponent(`مرحباً، أبحث عن نقطة بيع لمنتجات إكسترون في ${cityName}.`);
  return (
    <div className="sp-card absolute inset-x-3 bottom-3 z-[1100] rounded-2xl border border-white/10 bg-[rgba(5,6,10,0.96)] p-6 text-center shadow-2xl backdrop-blur md:inset-x-auto md:top-4 md:right-4 md:bottom-auto md:w-[360px]">
      <p className="readex text-lg text-white">لا توجد نقاط بيع في {cityName} حالياً</p>
      <p className="ar mt-2 text-sm leading-relaxed text-white/50">
        نعمل على التوسع قريباً. تواصل معنا لنخبرك بأقرب نقطة بيع لك.
      </p>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ar mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--lime)] px-5 py-3 text-sm font-black text-black"
      >
        تواصل عبر واتساب
      </a>
      <a
        href="/distributors"
        className="ar mt-3 block text-xs text-white/40 underline-offset-4 hover:text-[var(--lime)] hover:underline"
      >
        صاحب محل؟ كن نقطة بيع لإكسترون
      </a>
    </div>
  );
}
