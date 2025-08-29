import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirm: z.string().min(4),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (vals) => {
    await signup(vals.email, vals.password);
    navigate("/preferences");
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
        Create Account
      </h2>

      {/* Email */}
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
        <p style={{ color: "crimson", fontSize: "14px", margin: 0 }}>
          {errors.email.message}
        </p>
      )}

      {/* Password */}
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
        <p style={{ color: "crimson", fontSize: "14px", margin: 0 }}>
          {errors.password.message}
        </p>
      )}

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirm")}
        style={{
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      {errors.confirm && (
        <p style={{ color: "crimson", fontSize: "14px", margin: 0 }}>
          {errors.confirm.message}
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
        {isSubmitting ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}
