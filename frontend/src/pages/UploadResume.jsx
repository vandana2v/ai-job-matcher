import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF resume");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/analysis/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("analysis", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Resume analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-28 pb-10"
      style={{
        background:
          "radial-gradient(circle at top left, #0f172a 0%, #020617 45%, #111827 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.15),transparent_30%)]"></div>

      <div className="relative z-10 w-full max-w-2xl rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-10">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AI Resume Analysis
          </p>

          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Upload Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Resume
            </span>
          </h1>

          <p className="mt-3 text-gray-300">
            Get AI-powered analysis and discover top matching jobs
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center transition hover:border-cyan-400/60 hover:bg-white/10">
          <input
            id="resumeUpload"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />

          <label htmlFor="resumeUpload" className="cursor-pointer block">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl text-cyan-300">
              ↑
            </div>

            <p className="text-xl font-semibold text-white">
              Click to Upload Resume
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Supported format: PDF only
            </p>

            {file && (
              <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
                Selected File: {file.name}
              </div>
            )}
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Your resume stays secure and is only used for analysis
        </p>
      </div>
    </div>
  );
}