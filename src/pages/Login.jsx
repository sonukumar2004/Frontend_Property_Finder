import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (vals) => {
    await login(vals.email, vals.password);
    navigate("/properties");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: 420,
        margin: "40px auto",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "16px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1e40af",
        }}
      >
        Login
      </h2>

      {/* Email Input */}
      <input
        placeholder="Email"
        {...register("email")}
        style={{
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      {errors.email && (
        <p style={{ color: "crimson", fontSize: "14px", margin: "0" }}>
          {errors.email.message}
        </p>
      )}

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        style={{
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      {errors.password && (
        <p style={{ color: "crimson", fontSize: "14px", margin: "0" }}>
          {errors.password.message}
        </p>
      )}

      {/* Submit Button */}
      <button
        disabled={isSubmitting}
        type="submit"
        style={{
          backgroundColor: isSubmitting ? "#94a3b8" : "#1e40af",
          color: "white",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
