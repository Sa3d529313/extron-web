"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./SellingPointsMap.css";
import type { City, SellingPoint } from "@/data/sellingPoints";

type Props = {
  cities: City[];
  city: City | null;
  points: SellingPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onBackgroundClick: () => void;
};

const CITY_RING_METERS = 2500;
const CITY_MAX_ZOOM = 15;
const EMPTY_CITY_ZOOM = 12;
const FOCUS_ZOOM = 15;

function pinIcon(active: boolean) {
  return L.divIcon({
    className: `sp-pin${active ? " sp-pin--active" : ""}`,
    html: '<span class="sp-pin__head"><span class="sp-pin__dot"></span></span>',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });
}

function cityLabelIcon(name: string) {
  const label = document.createElement("span");
  label.className = "sp-city__label";
  label.textContent = name;
  return L.divIcon({
    className: "sp-city",
    html: label.outerHTML,
    iconSize: [0, 0],
  });
}

// Animate only when the user can see it: hidden tabs pause animation frames, which would freeze a flight half-way.
function shouldAnimate() {
  return !document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SellingPointsMap({
  cities,
  city,
  points,
  selectedId,
  onSelect,
  onBackgroundClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const pointsLayerRef = useRef<L.LayerGroup | null>(null);
  const cityLayerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
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
    pointsLayerRef.current = L.layerGroup().addTo(map);
    map.on("click", () => onBackgroundClickRef.current());
    mapRef.current = map;

    const markers = markersRef.current;
    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      markers.clear();
      map.remove();
      mapRef.current = null;
      pointsLayerRef.current = null;
      cityLayerRef.current = null;
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
        icon: pinIcon(false),
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
      markersRef.current.set(point.id, marker);
    }
  }, [points]);

  // Move to the selected city and mark it.
  useEffect(() => {
    const map = mapRef.current;
    const layer = cityLayerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    map.stop();
    const animate = shouldAnimate();

    if (!city) {
      map.flyToBounds(L.latLngBounds(cities.map((c) => c.center)), {
        padding: [40, 40],
        animate,
        duration: 1.2,
      });
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
      map.flyTo(city.center, EMPTY_CITY_ZOOM, { animate, duration: 1.2 });
    } else {
      // Fit every shop and the whole ring (with its label) on screen.
      const bounds = ring.getBounds();
      cityPoints.forEach((p) => bounds.extend([p.lat, p.lng]));
      map.flyToBounds(bounds, {
        paddingTopLeft: [50, 80],
        paddingBottomRight: [50, 50],
        maxZoom: CITY_MAX_ZOOM,
        animate,
        duration: 1.2,
      });
    }
  }, [city, cities, points]);

  // Highlight the selected marker and bring it into view beside the card.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker, id) => {
      const active = id === selectedId;
      marker.setIcon(pinIcon(active));
      marker.setZIndexOffset(active ? 1000 : 0);
    });

    if (!selectedId) return;
    const marker = markersRef.current.get(selectedId);
    if (!marker) return;

    const zoom = Math.max(map.getZoom(), FOCUS_ZOOM);
    const size = map.getSize();
    // Keep the pin clear of the info card: card sits on the right on desktop, at the bottom on phones.
    const offset = size.x >= 768 ? L.point(-190, 0) : L.point(0, -Math.round(size.y * 0.22));
    const target = map.unproject(map.project(marker.getLatLng(), zoom).subtract(offset), zoom);
    map.stop();
    map.flyTo(target, zoom, { animate: shouldAnimate(), duration: 0.8 });
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
