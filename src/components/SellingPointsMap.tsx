"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./SellingPointsMap.css";
import type { City, LatLng, PointType, SellingPoint } from "@/data/sellingPoints";
import { typeIconSvg } from "./SellingPointIcons";

type Props = {
  cities: City[];
  city: City | null;
  points: SellingPoint[];
  selectedId: string | null;
  userLocation: LatLng | null;
  onSelect: (id: string) => void;
  onBackgroundClick: () => void;
};

const CITY_RING_METERS = 2500;
const CITY_MAX_ZOOM = 15;
const EMPTY_CITY_ZOOM = 12;
const FOCUS_ZOOM = 15;
const PIN_HEIGHT = 44;
// Phone layout: type-filter bar at the top, info card (max 62% high) at the bottom.
const MOBILE_TOP_INSET = 60;
const MOBILE_CARD_SHARE = 0.62;

function pinIcon(type: PointType, active: boolean) {
  return L.divIcon({
    className: `sp-pin${active ? " sp-pin--active" : ""}`,
    html: `<span class="sp-pin__head"><span class="sp-pin__icon">${typeIconSvg(type)}</span></span>`,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
  });
}

function cityLabelIcon(name: string) {
  const label = document.createElement("span");
  label.className = "sp-city__label";
  label.textContent = name;
  return L.divIcon({ className: "sp-city", html: label.outerHTML, iconSize: [0, 0] });
}

const userIcon = () =>
  L.divIcon({
    className: "sp-user",
    html: '<span class="sp-user__pulse"></span><span class="sp-user__dot"></span>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

// Animate only when the user can see it: hidden tabs pause animation frames, which would freeze a flight half-way.
function shouldAnimate() {
  return !document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs a map flight, and if it hasn't finished shortly after its duration
 * (e.g. the browser throttled animation frames), jumps straight to the end
 * so the map is never left half-way.
 */
function guardedFlight(
  map: L.Map,
  timerRef: { current: ReturnType<typeof setTimeout> | null },
  durationSec: number,
  fly: (animate: boolean) => void,
) {
  if (timerRef.current) clearTimeout(timerRef.current);
  map.stop();
  const animate = shouldAnimate();
  let finished = false;
  map.once("moveend", () => {
    finished = true;
  });
  fly(animate);
  if (!animate) return;
  timerRef.current = setTimeout(() => {
    timerRef.current = null;
    if (finished) return;
    map.stop();
    fly(false);
  }, durationSec * 1000 + 700);
}

export default function SellingPointsMap({
  cities,
  city,
  points,
  selectedId,
  userLocation,
  onSelect,
  onBackgroundClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const pointsLayerRef = useRef<L.LayerGroup | null>(null);
  const cityLayerRef = useRef<L.LayerGroup | null>(null);
  const userLayerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<Map<string, { marker: L.Marker; type: PointType }>>(new Map());
  const flightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSelectRef = useRef(onSelect);
  const onBackgroundClickRef = useRef(onBackgroundClick);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onBackgroundClickRef.current = onBackgroundClick;
  }, [onSelect, onBackgroundClick]);

  // Create the map once.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const map = L.map(el, {
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    map.fitBounds(L.latLngBounds(cities.map((c) => c.center)), { padding: [40, 40] });

    L.control.zoom({ position: "bottomleft", zoomInTitle: "تكبير", zoomOutTitle: "تصغير" }).addTo(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    cityLayerRef.current = L.layerGroup().addTo(map);
    userLayerRef.current = L.layerGroup().addTo(map);
    pointsLayerRef.current = L.layerGroup().addTo(map);
    map.on("click", () => onBackgroundClickRef.current());
    mapRef.current = map;

    const markers = markersRef.current;
    const flightTimer = flightTimerRef;
    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(el);

    return () => {
      if (flightTimer.current) clearTimeout(flightTimer.current);
      resizeObserver.disconnect();
      markers.clear();
      map.remove();
      mapRef.current = null;
      pointsLayerRef.current = null;
      cityLayerRef.current = null;
      userLayerRef.current = null;
    };
  }, [cities]);

  // Replace the markers whenever the visible points change.
  useEffect(() => {
    const layer = pointsLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    markersRef.current.clear();

    for (const point of points) {
      const marker = L.marker([point.lat, point.lng], {
        icon: pinIcon(point.type, false),
        title: point.name,
        alt: point.name,
        riseOnHover: true,
        keyboard: true,
      });
      marker.on("click", () => onSelectRef.current(point.id));
      marker.on("keypress", (e: L.LeafletKeyboardEvent) => {
        if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
          onSelectRef.current(point.id);
        }
      });
      marker.addTo(layer);
      markersRef.current.set(point.id, { marker, type: point.type });
    }
  }, [points]);

  // Show where the visitor is (after "nearest to me").
  useEffect(() => {
    const layer = userLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    if (userLocation) {
      L.marker(userLocation, { icon: userIcon(), interactive: false, keyboard: false, zIndexOffset: 500 }).addTo(layer);
    }
  }, [userLocation]);

  // Move to the selected city and mark it.
  useEffect(() => {
    const map = mapRef.current;
    const layer = cityLayerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();

    if (!city) {
      const all = L.latLngBounds(cities.map((c) => c.center));
      guardedFlight(map, flightTimerRef, 1.2, (animate) =>
        map.flyToBounds(all, { padding: [40, 40], animate, duration: 1.2 }),
      );
      return;
    }

    const ring = L.circle(city.center, {
      radius: CITY_RING_METERS,
      className: "sp-city-ring",
      interactive: false,
    }).addTo(layer);
    // Label sits on the top edge of the ring so the shop pins never cover it.
    const ringTop: L.LatLngTuple = [city.center[0] + CITY_RING_METERS / 111_320, city.center[1]];
    L.marker(ringTop, {
      icon: cityLabelIcon(city.name),
      interactive: false,
      keyboard: false,
      zIndexOffset: -1000,
    }).addTo(layer);

    const cityPoints = points.filter((p) => p.cityId === city.id);
    if (cityPoints.length === 0) {
      guardedFlight(map, flightTimerRef, 1.2, (animate) =>
        map.flyTo(city.center, EMPTY_CITY_ZOOM, { animate, duration: 1.2 }),
      );
    } else {
      // Fit every shop and the whole ring (with its label) on screen.
      const bounds = ring.getBounds();
      cityPoints.forEach((p) => bounds.extend([p.lat, p.lng]));
      guardedFlight(map, flightTimerRef, 1.2, (animate) =>
        map.flyToBounds(bounds, {
          paddingTopLeft: [40, 70],
          paddingBottomRight: [40, 40],
          maxZoom: CITY_MAX_ZOOM,
          animate,
          duration: 1.2,
        }),
      );
    }
  }, [city, cities, points]);

  // Highlight the selected marker and bring it into view beside the card.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(({ marker, type }, id) => {
      const active = id === selectedId;
      marker.setIcon(pinIcon(type, active));
      marker.setZIndexOffset(active ? 1000 : 0);
    });

    if (!selectedId) return;
    const entry = markersRef.current.get(selectedId);
    if (!entry) return;

    const zoom = Math.max(map.getZoom(), FOCUS_ZOOM);
    const size = map.getSize();
    // Keep the pin clear of the info card: card sits on the right on desktop, at the bottom on phones.
    // On phones the pin tip goes in the middle of the free strip between the filter bar and the card.
    // Same breakpoint as the card's `md:` side-panel layout (viewport width, not map width).
    let offset: L.Point;
    if (window.matchMedia("(min-width: 768px)").matches) {
      offset = L.point(-190, 0);
    } else {
      const free = size.y - MOBILE_TOP_INSET - Math.round(size.y * MOBILE_CARD_SHARE);
      const tipY = MOBILE_TOP_INSET + PIN_HEIGHT + Math.max(0, (free - PIN_HEIGHT) / 2);
      offset = L.point(0, Math.round(tipY - size.y / 2));
    }
    const target = map.unproject(map.project(entry.marker.getLatLng(), zoom).subtract(offset), zoom);
    guardedFlight(map, flightTimerRef, 0.8, (animate) =>
      map.flyTo(target, zoom, { animate, duration: 0.8 }),
    );
  }, [selectedId, points]);

  return (
    <div
      ref={containerRef}
      className="sp-map h-full w-full"
      role="region"
      aria-label="خريطة نقاط البيع"
    />
  );
}
