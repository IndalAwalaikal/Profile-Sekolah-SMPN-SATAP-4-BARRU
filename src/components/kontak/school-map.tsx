"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const PINISI_ICON_HTML = `
<div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 3px 4px rgba(11,30,61,0.4))">
  <div style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#0b1e3d;border:2.5px solid #e39c30">
    <svg viewBox="0 0 88 56" width="24" height="16" style="transform:rotate(45deg)">
      <path d="M34 6 6 48h28z" fill="#E39C30" />
      <path d="M42 2v46h40z" fill="#ffffff" />
    </svg>
  </div>
  <div style="width:6px;height:8px;background:#0b1e3d;border-radius:0 0 3px 3px;margin-top:-2px"></div>
</div>`;

/** Peta lokasi sekolah dengan Leaflet + OpenStreetMap (gratis, tanpa API key)
 *  dan marker pinisi kustom. Leaflet dimuat dinamis agar aman dari SSR. */
export function SchoolMap({
  lat,
  lng,
  name,
  address,
}: {
  lat: number;
  lng: number;
  name: string;
  address: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([lat, lng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '\u00a9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        html: PINISI_ICON_HTML,
        className: "",
        iconSize: [40, 48],
        iconAnchor: [20, 44],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([lat, lng], { icon, title: name }).addTo(map);
      marker.bindPopup(
        `<strong>${name}</strong><br/><span>${address}</span>`,
      );
      marker.openPopup();
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lat, lng, name, address]);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[420px] w-full"
      role="application"
      aria-label={`Peta lokasi ${name}`}
    />
  );
}
