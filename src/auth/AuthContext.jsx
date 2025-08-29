import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api"; // Make sure you have axios instance here

// Create context
const AuthCtx = createContext(null);

// Custom hook for consuming auth
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // Signup
  const signup = async (email, password) => {
    try {
      const { data } = await api.post("/auth/signup", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
