// src/pages/PropertyDetail.jsx
import { useParams, Link } from "react-router-dom";

const properties = [
  { id: 1, title: "2BHK Apartment", location: "Bangalore", price: 45000, description: "Spacious apartment near IT hub" },
  { id: 2, title: "Villa", location: "Mumbai", price: 75000, description: "Luxury villa with garden" },
  { id: 3, title: "Studio Flat", location: "Delhi", price: 30000, description: "Compact studio near metro station" },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <h2 className="p-6">Property not found</h2>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
      <p><b>Location:</b> {property.location}</p>
      <p><b>Price:</b> ₹ {property.price}</p>
      <p><b>Description:</b> {property.description}</p>
      <Link to="/properties" className="text-blue-600 underline mt-4 block">Back to Listings</Link>
    </div>
  );
}
