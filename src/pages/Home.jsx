
import { Link } from "react-router-dom";

export default function Home() {
  const properties = [
    {
      id: 1,
      title: "2BHK Apartment",
      location: "Bangalore",
      price: 45000,
      description: "Spacious 2BHK near IT hub",
    },
    {
      id: 2,
      title: "Luxury Villa",
      location: "Mumbai",
      price: 125000,
      description: "Beautiful villa with sea view",
    },
    {
      id: 3,
      title: "Cozy Studio",
      location: "Delhi",
      price: 25000,
      description: "Compact studio for working professionals",
    },
  ];

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "16px",
          color: "#1e40af",
        }}
      >
        Welcome to Property Finder 🏠
      </h2>
      <p style={{ marginBottom: "24px", fontSize: "16px", color: "#444" }}>
        Find your dream property with ease. Explore listings with location maps
        and details.
      </p>

      {/* Property Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {properties.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease-in-out",
              backgroundColor: "#fff",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111" }}>
              {p.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#666", margin: "6px 0" }}>
              📍 {p.location}
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#16a34a",
                marginBottom: "8px",
              }}
            >
              ₹{p.price.toLocaleString()}
            </p>
            <p style={{ fontSize: "14px", color: "#444" }}>{p.description}</p>
            
            {/* View Details Button */}
            <Link
              to={`/properties/${p.id}`}
              style={{
                display: "inline-block",
                marginTop: "12px",
                padding: "8px 16px",
                backgroundColor: "#1e40af",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
