import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const getErrorMessage = (err) => {
    const detail = err?.response?.data?.detail;

    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) return detail.map((item) => item.msg).join(", ");
    if (detail && typeof detail === "object") return JSON.stringify(detail);

    return "Registration failed. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password.length > 150) {
      setError("Password is too long.");
      return;
    }

    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.access_token);
      setSuccess("Registration successful!");

      setTimeout(() => {
        navigate("/jobs");
      }, 1000);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-28 pb-10"
      style={{
        background:
          "radial-gradient(circle at top left, #0f172a 0%, #020617 40%, #111827 100%)",
      }}
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.15),transparent_30%)]"></div>

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
          Create{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Account
          </span>
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-6">
          Register to explore jobs and analyze your resume
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-4 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <p className="text-xs text-gray-400">
            Use 8+ characters with uppercase, lowercase, number & symbol
          </p>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 py-3 text-white font-semibold shadow-lg transition duration-300 hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-center mt-5 text-sm text-gray-400">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}