"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import {
  CITIES,
  SELLING_POINTS,
  POINT_TYPE_LABELS,
  distanceKm,
  formatDistance,
  googleMapsUrl,
  nearestPoint,
  type LatLng,
  type PointType,
  type SellingPoint,
} from "@/data/sellingPoints";
import { WHATSAPP_NUMBER } from "@/data/products";
import { TypeIcon, UiIcon } from "./SellingPointIcons";
import "./SellingPointsMap.css";

const SellingPointsMap = dynamic(() => import("./SellingPointsMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-[var(--bg-2)]">
      <span className="ar animate-pulse text-sm text-white/40">جاري تحميل الخريطة…</span>
    </div>
  ),
});

const NAV_OFFSET = -110;
type TypeFilter = PointType | "all";

const pointCountByCity = SELLING_POINTS.reduce<Record<string, number>>((acc, p) => {
  acc[p.cityId] = (acc[p.cityId] ?? 0) + 1;
  return acc;
}, {});

// Cities with shops first (most shops first), then the rest.
const ORDERED_CITIES = [...CITIES].sort(
  (a, b) => (pointCountByCity[b.id] ?? 0) - (pointCountByCity[a.id] ?? 0),
);
const ACTIVE_CITY_COUNT = CITIES.filter((c) => pointCountByCity[c.id]).length;

const TYPE_ORDER = Object.keys(POINT_TYPE_LABELS) as PointType[];

function citiesLabel(n: number) {
  if (n === 1) return "مدينة واحدة";
  if (n === 2) return "مدينتين";
  if (n <= 10) return `${n} مدن`;
  return `${n} مدينة`;
}

export default function SellingPoints() {
  const [cityId, setCityId] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoMessage, setGeoMessage] = useState<string | null>(null);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();

  const city = useMemo(() => CITIES.find((c) => c.id === cityId) ?? null, [cityId]);
  const cityPoints = useMemo(
    () => (city ? SELLING_POINTS.filter((p) => p.cityId === city.id) : SELLING_POINTS),
    [city],
  );
  const typeCounts = useMemo(() => {
    const counts = new Map<PointType, number>();
    for (const p of cityPoints) counts.set(p.type, (counts.get(p.type) ?? 0) + 1);
    return TYPE_ORDER.filter((t) => counts.has(t)).map((t) => ({ type: t, count: counts.get(t)! }));
  }, [cityPoints]);
  const visiblePoints = useMemo(
    () => (typeFilter === "all" ? cityPoints : cityPoints.filter((p) => p.type === typeFilter)),
    [cityPoints, typeFilter],
  );
  // Derived, so a stale selection from another city or filter can never show.
  const selected = useMemo(
    () => visiblePoints.find((p) => p.id === selectedId) ?? null,
    [visiblePoints, selectedId],
  );
  const showTypeFilters = !!city && typeCounts.length > 1;

  const distanceTo = useCallback(
    (p: SellingPoint) => (userLocation ? distanceKm(userLocation, [p.lat, p.lng]) : null),
    [userLocation],
  );

  // Bumped to ask for a scroll to the map; handled after React has re-rendered,
  // so the map's final position is used.
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
    setTypeFilter("all");
    setCityId(id);
    requestScrollToMap();
  };

  const handleTypeChange = (type: TypeFilter) => {
    setTypeFilter(type);
    setSelectedId(null);
  };

  const handleMarkerSelect = useCallback(
    (id: string) => {
      const point = SELLING_POINTS.find((p) => p.id === id);
      if (!point) return;
      if (point.cityId !== cityId) setTypeFilter("all");
      setCityId(point.cityId);
      setSelectedId(id);
    },
    [cityId],
  );

  const closeCard = useCallback(() => setSelectedId(null), []);

  const handleListSelect = (id: string) => {
    setSelectedId(id);
    requestScrollToMap();
  };

  const findNearest = () => {
    setGeoMessage(null);
    if (!("geolocation" in navigator)) {
      setGeoMessage("متصفحك لا يدعم تحديد الموقع. اختر مدينتك من الأعلى.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const here: LatLng = [pos.coords.latitude, pos.coords.longitude];
        const nearest = nearestPoint(here, SELLING_POINTS);
        setUserLocation(here);
        if (!nearest) return;
        setTypeFilter("all");
        setCityId(nearest.point.cityId);
        setSelectedId(nearest.point.id);
        requestScrollToMap();
        if (nearest.km > 40) {
          setGeoMessage(`أقرب نقطة بيع تبعد عنك حوالي ${formatDistance(nearest.km)}.`);
        }
      },
      (err) => {
        setLocating(false);
        setGeoMessage(
          err.code === err.PERMISSION_DENIED
            ? "لم تسمح بالوصول لموقعك. فعّل الموقع من إعدادات المتصفح، أو اختر مدينتك."
            : "تعذّر تحديد موقعك الآن. حاول مرة أخرى، أو اختر مدينتك.",
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
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
    <section className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-5 md:px-10 md:pb-28" dir="rtl">
      {/* Controls */}
      <div className="rounded-2xl border border-white/10 bg-[var(--bg-2)] p-4 sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="readex text-lg text-white md:text-xl">اختر مدينتك</h2>
            <p className="ar mt-1 text-sm text-white/45">
              {SELLING_POINTS.length} نقطة بيع في {citiesLabel(ACTIVE_CITY_COUNT)} — والقائمة تكبر
            </p>
          </div>

          <button
            type="button"
            onClick={findNearest}
            disabled={locating}
            className="ar inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--lime)]/40 bg-[var(--lime)]/10 px-5 text-sm font-bold text-[var(--lime)] transition-colors hover:bg-[var(--lime)] hover:text-black disabled:cursor-wait disabled:opacity-70"
          >
            <UiIcon name="locate" className={`h-5 w-5 ${locating ? "animate-spin" : ""}`} />
            {locating ? "جاري تحديد موقعك…" : "أقرب نقطة بيع لي"}
          </button>
        </div>

        {geoMessage && (
          <p role="status" className="ar mt-3 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70">
            {geoMessage}
          </p>
        )}

        <div
          role="group"
          aria-label="المدن"
          className="sp-scroll-x -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-5 sm:px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          <Chip active={!city} onClick={() => handleCityChange("")}>
            <UiIcon name="grid" className="h-4 w-4" />
            كل المدن
          </Chip>
          {ORDERED_CITIES.map((c) => (
            <Chip key={c.id} active={c.id === cityId} onClick={() => handleCityChange(c.id)}>
              {c.name}
              <Count active={c.id === cityId}>{pointCountByCity[c.id] ?? 0}</Count>
            </Chip>
          ))}
        </div>
      </div>

      {/* Map */}
      <div
        ref={mapSectionRef}
        className="relative isolate mt-5 h-[62svh] max-h-[640px] min-h-[400px] overflow-hidden rounded-2xl border border-white/10 md:mt-6 md:h-[min(640px,calc(100svh-130px))] md:max-h-none"
      >
        <SellingPointsMap
          cities={CITIES}
          city={city}
          points={visiblePoints}
          selectedId={selected?.id ?? null}
          userLocation={userLocation}
          onSelect={handleMarkerSelect}
          onBackgroundClick={closeCard}
        />

        {!city && (
          <div className="pointer-events-none absolute inset-x-3 top-3 z-[1000] flex justify-center">
            <p className="ar rounded-full bg-black/75 px-4 py-2 text-center text-xs text-white/80 backdrop-blur sm:text-sm">
              اختر مدينتك، أو اضغط على أي نقطة في الخريطة
            </p>
          </div>
        )}

        {showTypeFilters && (
          <div
            role="group"
            aria-label="نوع المحل"
            className="sp-scroll-x absolute inset-x-0 top-0 z-[1000] flex gap-2 overflow-x-auto px-3 pt-3 pb-2"
          >
            <FilterChip active={typeFilter === "all"} onClick={() => handleTypeChange("all")}>
              الكل
              <Count active={typeFilter === "all"}>{cityPoints.length}</Count>
            </FilterChip>
            {typeCounts.map(({ type, count }) => (
              <FilterChip key={type} active={typeFilter === type} onClick={() => handleTypeChange(type)}>
                <TypeIcon type={type} className="h-4 w-4" />
                {POINT_TYPE_LABELS[type]}
                <Count active={typeFilter === type}>{count}</Count>
              </FilterChip>
            ))}
          </div>
        )}

        {city && cityPoints.length === 0 && <EmptyCityCard cityName={city.name} />}

        {selected && (
          <PointCard
            key={selected.id}
            point={selected}
            distance={distanceTo(selected)}
            belowFilters={showTypeFilters}
            onClose={closeCard}
          />
        )}
      </div>

      {/* List of the visible points */}
      {city && visiblePoints.length > 0 && (
        <div className="mt-10 md:mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="readex text-2xl text-white md:text-3xl">
              نقاط البيع في <span className="text-[var(--lime)]">{city.name}</span>
            </h2>
            <span className="ar shrink-0 text-sm text-white/40">{visiblePoints.length} نقطة</span>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePoints.map((p) => (
              <li key={p.id}>
                <ListItem
                  point={p}
                  active={p.id === selected?.id}
                  distance={distanceTo(p)}
                  onSelect={() => handleListSelect(p.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`ar inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-bold whitespace-nowrap transition-colors ${
        active
          ? "border-[var(--lime)] bg-[var(--lime)] text-black"
          : "border-white/15 bg-white/[0.03] text-white/80 hover:border-[var(--lime)] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`ar inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-bold whitespace-nowrap shadow-lg backdrop-blur transition-colors sm:text-sm ${
        active
          ? "border-[var(--lime)] bg-[var(--lime)] text-black"
          : "border-white/15 bg-black/75 text-white/85 hover:border-[var(--lime)]"
      }`}
    >
      {children}
    </button>
  );
}

function Count({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] leading-none ${
        active ? "bg-black/15 text-black" : "bg-white/10 text-white/70"
      }`}
    >
      {children}
    </span>
  );
}

function ListItem({
  point,
  active,
  distance,
  onSelect,
}: {
  point: SellingPoint;
  active: boolean;
  distance: number | null;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`ar group flex w-full items-center gap-3 rounded-xl border p-3 text-right transition-colors ${
        active
          ? "border-[var(--pink)] bg-[var(--pink)]/10"
          : "border-white/10 bg-white/[0.02] hover:border-[var(--lime)]/60 hover:bg-white/[0.04]"
      }`}
    >
      {point.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={point.image} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
      ) : (
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-[var(--lime)]/10 text-[var(--lime)]">
          <TypeIcon type={point.type} className="h-6 w-6" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold text-white">{point.name}</span>
        <span className="mt-0.5 block truncate text-sm text-white/50">
          {POINT_TYPE_LABELS[point.type]} · {point.area}
        </span>
      </span>
      {distance !== null ? (
        <span className="shrink-0 rounded-full bg-white/5 px-2 py-1 text-xs text-[var(--lime)]">
          {formatDistance(distance)}
        </span>
      ) : (
        <UiIcon
          name="chevron"
          className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:-translate-x-0.5 group-hover:text-[var(--lime)]"
        />
      )}
    </button>
  );
}

function PointCard({
  point,
  distance,
  belowFilters,
  onClose,
}: {
  point: SellingPoint;
  distance: number | null;
  belowFilters: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const city = CITIES.find((c) => c.id === point.cityId);
  const phones = point.phones ?? [];

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      role="dialog"
      aria-label={point.name}
      data-lenis-prevent
      className={`sp-card absolute inset-x-0 bottom-0 z-[1100] max-h-[62%] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[rgba(5,6,10,0.97)] shadow-[0_-10px_40px_rgba(0,0,0,0.6)] backdrop-blur md:inset-x-auto md:right-4 md:bottom-auto md:w-[360px] md:rounded-2xl md:border md:shadow-2xl ${
        belowFilters ? "md:top-16 md:max-h-[calc(100%-5rem)]" : "md:top-4 md:max-h-[calc(100%-2rem)]"
      }`}
    >
      {/* Grab handle (phones) */}
      <div className="sticky top-0 z-10 flex justify-center pt-2 pb-1 md:hidden" aria-hidden>
        <span className="h-1 w-10 rounded-full bg-white/25" />
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="إغلاق"
        className="absolute top-4 left-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/75 text-white backdrop-blur transition-colors hover:bg-[var(--lime)] hover:text-black md:top-3"
      >
        <UiIcon name="close" className="h-4 w-4" />
      </button>

      {/* Large photo on desktop; phones get a thumbnail so the map stays visible */}
      {point.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={point.image} alt={point.name} className="hidden h-44 w-full object-cover md:block" />
      )}

      <div className="px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-5 md:pt-4 md:pb-5">
        <div className="flex items-start gap-3 md:block">
          {point.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={point.image}
              alt=""
              className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover md:hidden"
            />
          ) : (
            <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-xl bg-[var(--lime)]/10 text-[var(--lime)] md:hidden">
              <TypeIcon type={point.type} className="h-8 w-8" />
            </span>
          )}

          <div className="min-w-0 flex-1 pl-10 md:pl-0">
            <span className="ar inline-flex items-center gap-1.5 rounded-full bg-[var(--lime)]/15 px-2.5 py-0.5 text-[11px] font-bold text-[var(--lime)] md:px-3 md:py-1 md:text-xs">
              <TypeIcon type={point.type} className="h-3.5 w-3.5" />
              {POINT_TYPE_LABELS[point.type]}
            </span>
            <h3 className="readex mt-1.5 text-lg leading-snug text-white md:mt-3 md:pl-10 md:text-xl">{point.name}</h3>
          </div>
        </div>

        <ul className="ar mt-3 space-y-1.5 text-sm text-white/75 md:space-y-2">
          <li className="flex items-start gap-2">
            <UiIcon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
            <span>
              {city ? `${city.name} — ` : ""}
              {point.area}
            </span>
          </li>
          {distance !== null && (
            <li className="flex items-center gap-2">
              <UiIcon name="locate" className="h-4 w-4 shrink-0 text-white/40" />
              <span>
                يبعد عنك حوالي <b className="text-[var(--lime)]">{formatDistance(distance)}</b>
              </span>
            </li>
          )}
          {point.hours && (
            <li className="flex items-center gap-2">
              <span className="w-4 shrink-0 text-center text-white/40">🕒</span>
              <span>{point.hours}</span>
            </li>
          )}
        </ul>

        <div className={`mt-4 grid gap-2 md:mt-5 ${phones.length ? "grid-cols-[1fr_auto]" : ""}`}>
          <a
            href={googleMapsUrl(point)}
            target="_blank"
            rel="noopener noreferrer"
            className="ar flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--lime)] px-4 text-sm font-black text-black transition-transform active:scale-[0.98]"
          >
            <UiIcon name="directions" className="h-4 w-4" />
            الاتجاهات
          </a>
          {phones.length > 0 && (
            <a
              href={`tel:${phones[0].replace(/[^\d+]/g, "")}`}
              className="ar flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-bold text-white transition-colors hover:border-[var(--lime)] active:scale-[0.98]"
            >
              <UiIcon name="phone" className="h-4 w-4" />
              اتصال
            </a>
          )}
        </div>

        {phones.length > 1 && (
          <p className="ar mt-3 text-xs text-white/45">
            أرقام أخرى:{" "}
            {phones.slice(1).map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                dir="ltr"
                className="mr-1 inline-block text-white/75 underline-offset-2 hover:text-[var(--lime)] hover:underline"
              >
                {phone}
              </a>
            ))}
          </p>
        )}

        {!point.exact && !point.mapsUrl && (
          <p className="ar mt-3 text-center text-[11px] leading-relaxed text-white/35">
            الموقع على الخريطة تقريبي — زر الاتجاهات يوصلك للمحل بدقة
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
        className="ar mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--lime)] px-5 text-sm font-black text-black"
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
