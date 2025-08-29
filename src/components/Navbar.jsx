// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        backgroundColor: "#1e40af", // blue-600
        color: "#fff",
        padding: "12px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left Side Links */}
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/properties" style={{ color: "#fff", textDecoration: "none" }}>
          Properties
        </Link>
        {user && (
          <Link to="/preferences" style={{ color: "#fff", textDecoration: "none" }}>
            Preferences
          </Link>
        )}
      </div>

      {/* Right Side Auth Buttons */}
      <div>
        {user ? (
          <button
            onClick={logout}
            style={{
              backgroundColor: "#dc2626", // red-500
              color: "#fff",
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "#fff", marginRight: "12px", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link to="/signup" style={{ color: "#fff", textDecoration: "none" }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
