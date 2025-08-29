import { Link } from "react-router-dom";
export default function PropertyCard({p}) {
  return (
    <div style={{border:"1px solid #eee",borderRadius:8,padding:12}}>
      <h3>{p.title}</h3>
      <p>{p.location}</p>
      <p>₹{p.price.toLocaleString()}</p>
      <Link to={`/properties/${p.id}`}>View details</Link>
    </div>
  );
}
