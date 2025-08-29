import { useEffect, useState } from "react";
import api from "../lib/api";
import PropertyCard from "../components/PropertyCard";
import MapView from "../map/MapView";

export default function Properties(){
  const [properties, setProperties] = useState([]);
  const [q, setQ] = useState("");

  useEffect(()=>{
    api.get("/properties").then(res=> setProperties(res.data));
  },[]);

  const filtered = properties.filter(p =>
    [p.title,p.location].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{padding:16}}>
      <h1>Available Properties</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title or city..." />
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12,marginTop:12}}>
        {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
      </div>
      <h2 style={{marginTop:24}}>Map</h2>
      <MapView properties={filtered} height={420} />
    </div>
  );
}
