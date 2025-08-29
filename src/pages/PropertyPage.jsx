import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import MapView from "../map/MapView";

export default function PropertyPage(){
  const { id } = useParams();
  const [p,setP] = useState(null);

  useEffect(()=>{
    api.get(`/properties/${id}`).then(res=> setP(res.data));
  },[id]);

  if(!p) return <p style={{padding:16}}>Loading...</p>;

  return (
    <div style={{padding:16}}>
      <h1>{p.title}</h1>
      <p><b>Location:</b> {p.location}</p>
      <p><b>Price:</b> ₹{p.price.toLocaleString()}</p>
      <p>{p.description}</p>

      <h3 style={{marginTop:16}}>Location</h3>
      <MapView properties={[p]} height={360} />
    </div>
  );
}
