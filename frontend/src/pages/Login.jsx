import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      setSuccess("Login successful!");

      setTimeout(() => {
        navigate("/upload");
      }, 1000);
    } catch (err) {
      setError(err?.response?.data?.detail || "Login failed.");
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.15),transparent_30%)]"></div>

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
          Welcome{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Back
          </span>
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-6">
          Login to continue with AI Job Matcher
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 py-3 text-white font-semibold shadow-lg transition duration-300 hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}