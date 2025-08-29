// // src/pages/PropertyList.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const properties = [
//   { id: 1, title: "2BHK Apartment", lat: 12.9716, lng: 77.5946, location: "Bangalore" },
//   { id: 2, title: "Villa", lat: 19.076, lng: 72.8777, location: "Mumbai" },
// ];

// export default function PropertyList() {
//   const [selected, setSelected] = useState(null);

//   return (
//     <div style={{ display: "flex", height: "90vh" }}>
//       {/* 🗺️ Map */}
//       <div style={{ flex: 1 }}>
//         <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           {properties.map((p) => (
//             <Marker
//               key={p.id}
//               position={[p.lat, p.lng]}
//               eventHandlers={{
//                 click: () => setSelected(p),
//               }}
//             >
//               <Popup>{p.title}</Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>

//       {/* 📃 Property List */}
//       <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
//         <h2>Available Properties</h2>
//         {properties.map((p) => (
//           <div key={p.id} style={{ marginBottom: "1rem" }}>
//             <h3>{p.title}</h3>
//             <p>{p.location}</p>
//             <Link to={`/properties/${p.id}`}>View Details</Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// src/pages/PropertyList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const properties = [
  { id: 1, title: "2BHK Apartment", lat: 12.9716, lng: 77.5946, location: "Bangalore" },
  { id: 2, title: "Villa", lat: 19.076, lng: 72.8777, location: "Mumbai" },
  { id: 3, title: "Penthouse", lat: 28.6139, lng: 77.209, location: "Delhi" },
];

export default function PropertyList() {
  const [search, setSearch] = useState("");

  // 🔍 Filter properties based on search
  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "90vh" }}>
      {/* 📃 Property List (LEFT) */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Available Properties</h2>
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div
              key={p.id}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{p.title}</h3>
              <p style={{ margin: "0 0 0.5rem 0" }}>{p.location}</p>
              <Link to={`/properties/${p.id}`} style={{ color: "#1e40af" }}>
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No properties found</p>
        )}
      </div>

      {/* 🗺️ Map (RIGHT) */}
      <div style={{ flex: 2, position: "relative" }}>
        {/* 🔍 Search Bar Overlay */}
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1000,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "250px",
          }}
        />

        <MapContainer
          center={[20.5937, 78.9629]} // India center
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filtered.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <b>{p.title}</b>
                <br />
                {p.location}
                <br />
                <Link to={`/properties/${p.id}`}>View</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
