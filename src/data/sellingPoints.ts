export type LatLng = [number, number];

export type PointType =
  | "supermarket"
  | "cafe"
  | "restaurant"
  | "roastery"
  | "bakery"
  | "gym"
  | "other";

export const POINT_TYPE_LABELS: Record<PointType, string> = {
  supermarket: "سوبرماركت",
  cafe: "كافيه",
  restaurant: "مطعم",
  roastery: "محمص",
  bakery: "مخبز",
  gym: "جيم",
  other: "نقطة بيع",
};

export type City = {
  id: string;
  name: string;
  nameEn: string;
  center: LatLng;
};

export type SellingPoint = {
  id: string;
  cityId: string;
  name: string;
  type: PointType;
  /** Neighbourhood / street shown under the name, e.g. "رفيديا" */
  area: string;
  lat: number;
  lng: number;
  /** true once lat/lng come from the shop's real Google Maps pin */
  exact?: boolean;
  /** Exact Google Maps link for the shop; otherwise the button searches by name */
  mapsUrl?: string;
  phones?: string[];
  hours?: string;
  /** Path under /public, e.g. "/locations/shop.jpg" */
  image?: string;
};

// Only these cities appear in the dropdown. To open a new city, add it here —
// its points below then show up automatically.
export const CITIES: City[] = [
  { id: "nablus", name: "نابلس", nameEn: "Nablus", center: [32.2211, 35.2544] },
  { id: "qalqilya", name: "قلقيلية", nameEn: "Qalqilya", center: [32.1897, 34.9706] },
];

// Positions are approximate (neighbourhood level) until each shop's real
// Google Maps link is added; set `exact: true` with the real lat/lng then.
const ALL_POINTS: SellingPoint[] = [
  // ── Nablus ──────────────────────────────────────────────
  { id: "nb-forno", cityId: "nablus", name: "مخبز الفورنو", type: "bakery", area: "شارع فلسطين", lat: 32.2203, lng: 35.2556 },
  { id: "nb-sigafredo", cityId: "nablus", name: "كافيه سيجافريدو", type: "cafe", area: "بيت وزن", lat: 32.2305, lng: 35.2087 },
  { id: "nb-sitt-eldunya", cityId: "nablus", name: "كافيه ست الدني", type: "cafe", area: "شارع 25", lat: 32.2241, lng: 35.2442 },
  { id: "nb-cairo-coffee", cityId: "nablus", name: "قهوة القاهرة", type: "cafe", area: "رفيديا", lat: 32.2271, lng: 35.2409 },
  { id: "nb-farid-zamano", cityId: "nablus", name: "كافيه فريد زمانه", type: "cafe", area: "شارع 15", lat: 32.2251, lng: 35.2459 },
  { id: "nb-rexos", cityId: "nablus", name: "مطعم وكافيه ريكسوس", type: "restaurant", area: "رفيديا", lat: 32.2284, lng: 35.2388 },
  { id: "nb-pita-bite", cityId: "nablus", name: "مطعم بيتا بايت", type: "restaurant", area: "رفيديا", lat: 32.2268, lng: 35.2379 },
  { id: "nb-palestine-rest", cityId: "nablus", name: "مطعم فلسطين", type: "restaurant", area: "شارع فلسطين", lat: 32.2198, lng: 35.2571 },
  { id: "nb-qasr-fitness", cityId: "nablus", name: "نادي قصر اللياقة", type: "gym", area: "رفيديا", lat: 32.2292, lng: 35.2352 },
  { id: "nb-salous", cityId: "nablus", name: "سلعوس هايبر", type: "supermarket", area: "بيت إيبا", lat: 32.2289, lng: 35.1961, image: "/locations/cards/nb-salous.jpg" },
  { id: "nb-rafidia-mall", cityId: "nablus", name: "رفيديا مول", type: "supermarket", area: "رفيديا", lat: 32.2259, lng: 35.2433, image: "/locations/cards/nb-rafidia-mall.jpg" },
  { id: "nb-antalya", cityId: "nablus", name: "سوبر ماركت أنطاليا", type: "supermarket", area: "رفيديا", lat: 32.2275, lng: 35.2343, phones: ["0568245233", "0592699259"], image: "/locations/cards/nb-antalya.jpg" },
  { id: "nb-awael", cityId: "nablus", name: "سوبر ماركت العائلات", type: "supermarket", area: "رفيديا", lat: 32.2265, lng: 35.2448, image: "/locations/cards/nb-awael.jpg" },
  { id: "nb-beit-alkaram", cityId: "nablus", name: "سوبرماركت بيت الكرم", type: "supermarket", area: "العامرية", lat: 32.2246, lng: 35.2318, image: "/locations/cards/nb-beit-alkaram.jpg" },
  { id: "nb-basha-mall", cityId: "nablus", name: "الباشا مول", type: "supermarket", area: "راس العين", lat: 32.2168, lng: 35.2552, image: "/locations/cards/nb-basha-mall.jpg" },
  { id: "nb-mousa-rest", cityId: "nablus", name: "سوبر ماركت واستراحة موسى", type: "supermarket", area: "دير شرف", lat: 32.2513, lng: 35.1771, image: "/locations/cards/nb-mousa-rest.jpg" },
  { id: "nb-alnuha", cityId: "nablus", name: "سوبرماركت النهى", type: "supermarket", area: "قوصين - وسط البلد", lat: 32.2347, lng: 35.1876, image: "/locations/cards/nb-alnuha.jpg" },
  { id: "nb-tal-akhdar", cityId: "nablus", name: "سوبرماركت التل الأخضر", type: "supermarket", area: "رفيديا", lat: 32.2279, lng: 35.2366 },
  { id: "nb-aswaq-amariya", cityId: "nablus", name: "أسواق العامرية", type: "supermarket", area: "العامرية - حي طيبة", lat: 32.2236, lng: 35.2296 },
  { id: "nb-malhas", cityId: "nablus", name: "سوبرماركت ملحس", type: "supermarket", area: "شارع غرناطة / الدوار", lat: 32.2213, lng: 35.2604 },
  { id: "nb-metro", cityId: "nablus", name: "سوبر ماركت ميترو", type: "supermarket", area: "رفيديا", lat: 32.2262, lng: 35.2398 },
  { id: "nb-elite", cityId: "nablus", name: "سوبر ماركت إيليت (Elite Market)", type: "supermarket", area: "بيت وزن", lat: 32.2297, lng: 35.2052 },
  { id: "nb-kajo", cityId: "nablus", name: "محمص كاجو مسلماني", type: "roastery", area: "رفيديا", lat: 32.2255, lng: 35.2421 },
  { id: "nb-faris", cityId: "nablus", name: "محمص الفارس", type: "roastery", area: "بيت وزن", lat: 32.2288, lng: 35.2071 },
  { id: "nb-mutamayizoun", cityId: "nablus", name: "سوبر ماركت المتميزون", type: "supermarket", area: "شارع تونس", lat: 32.2232, lng: 35.2474 },
  { id: "nb-aqrouq", cityId: "nablus", name: "سوبر ماركت العقروق", type: "supermarket", area: "رفيديا", lat: 32.2273, lng: 35.2425 },
  { id: "nb-rukn-almusafir", cityId: "nablus", name: "كفتيريا ركن المسافر", type: "cafe", area: "المجمع الغربي", lat: 32.2226, lng: 35.2488 },
  { id: "nb-subuh", cityId: "nablus", name: "سوبر ماركت صبح", type: "supermarket", area: "المجمع الغربي", lat: 32.2221, lng: 35.2497 },
  { id: "nb-wadi", cityId: "nablus", name: "أسواق الوادي الاستهلاكية", type: "supermarket", area: "التعاون - شارع التعاون العلوي، نابلس الجديدة", lat: 32.2331, lng: 35.2412 },
  { id: "nb-brazili", cityId: "nablus", name: "سوبرماركت وبن البرازيلي", type: "supermarket", area: "شارع العدل - سفيان", lat: 32.2187, lng: 35.2648, image: "/locations/cards/nb-brazili.jpg" },
  { id: "nb-family-tur", cityId: "nablus", name: "سوبرماركت فاميلي ستورز (بيت الكل)", type: "supermarket", area: "الطور", lat: 32.2011, lng: 35.2731, image: "/locations/cards/nb-family-tur.jpg" },
  { id: "nb-family-ras", cityId: "nablus", name: "سوبرماركت فاميلي ستورز (بيت الكل)", type: "supermarket", area: "راس العين", lat: 32.2161, lng: 35.2536, image: "/locations/cards/nb-family-ras.jpg" },
  { id: "nb-basma-mall", cityId: "nablus", name: "البسمة مول", type: "supermarket", area: "شارع القدس", lat: 32.2163, lng: 35.2788 },
  { id: "nb-mukhtar", cityId: "nablus", name: "سوبر ماركت المختار", type: "supermarket", area: "شارع القدس", lat: 32.2171, lng: 35.2771 },

  // ── Qalqilya ────────────────────────────────────────────
  { id: "qq-alwaled", cityId: "qalqilya", name: "سوبر ماركت الوليد", type: "supermarket", area: "شارع نابلس", lat: 32.1904, lng: 34.9787 },
  { id: "qq-dream-mall", cityId: "qalqilya", name: "دريم مول", type: "supermarket", area: "قلقيلية", lat: 32.1889, lng: 34.9719 },

  // ── Jenin (hidden until Jenin is added to CITIES) ───────
  { id: "jn-saad-aldin", cityId: "jenin", name: "سوبر ماركت سعد الدين", type: "supermarket", area: "شارع الناصرة", lat: 32.4641, lng: 35.2962, image: "/locations/cards/jn-saad-aldin.jpg" },
  { id: "jn-laith-mall", cityId: "jenin", name: "الليث مول", type: "supermarket", area: "شارع الناصرة", lat: 32.4652, lng: 35.2971, image: "/locations/cards/jn-laith-mall.jpg" },
  { id: "jn-muslimani", cityId: "jenin", name: "محامص سعد المسلماني", type: "roastery", area: "شارع حيفا", lat: 32.4609, lng: 35.2884, image: "/locations/cards/jn-muslimani.jpg" },
];

export const SELLING_POINTS: SellingPoint[] = ALL_POINTS.filter((p) =>
  CITIES.some((c) => c.id === p.cityId),
);

/** Great-circle distance in km. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.max(50, Math.round((km * 1000) / 50) * 50)} م`;
  if (km < 10) return `${km.toFixed(1)} كم`;
  return `${Math.round(km)} كم`;
}

export function nearestPoint(from: LatLng, points: SellingPoint[]): { point: SellingPoint; km: number } | null {
  let best: { point: SellingPoint; km: number } | null = null;
  for (const point of points) {
    const km = distanceKm(from, [point.lat, point.lng]);
    if (!best || km < best.km) best = { point, km };
  }
  return best;
}

export function googleMapsUrl(point: SellingPoint): string {
  if (point.mapsUrl) return point.mapsUrl;
  if (point.exact) {
    return `https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}`;
  }
  // No exact pin yet: search Google Maps for the shop itself.
  const city = CITIES.find((c) => c.id === point.cityId)?.name ?? "";
  const query = [point.name, point.area, city].filter(Boolean).join("، ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
