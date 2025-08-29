
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

function FitBounds({ points }) {
  const map = useMap();
  if (points.length === 1) {
    map.setView(points[0], 13);
  } else if (points.length > 1) {
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40] });
  }
  return null;
}

export default function MapView({ properties, height = 400 }) {
  const points = properties
    .filter(p => typeof p.lat === "number" && typeof p.lng === "number")
    .map(p => [p.lat, p.lng]);

  return (
    <div
      style={{
        height,
        width: "100%",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.length > 0 && <FitBounds points={points} />}
        {properties.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "14px", color: "#1e40af" }}>{p.title}</b>
                <br />
                <span style={{ fontSize: "12px", color: "#555" }}>
                  {p.location}
                </span>
                <br />
                <span style={{ fontWeight: "bold", color: "#16a34a" }}>
                  ₹{p.price?.toLocaleString?.()}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
