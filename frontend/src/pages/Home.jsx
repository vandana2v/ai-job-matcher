import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background image from public folder */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-950/20 to-pink-900/20" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl rounded-3xl border border-white/20 bg-white/10 px-6 py-10 text-center shadow-2xl backdrop-blur-xl md:px-12 md:py-14"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AI Powered Career Platform
          </p>

          <h1 className="text-4xl font-extrabold uppercase leading-tight text-white md:text-6xl">
            Find The{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Right Job
            </span>
            <br />
            With AI Power
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-200">
            Upload your resume, get smart AI-based job matches, and improve your
            career with powerful insights.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/jobs"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Explore Jobs
            </Link>

            <Link
              to="/upload"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Upload Resume
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold text-cyan-300">10K+</h3>
              <p className="text-sm text-gray-300">Jobs</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-pink-300">5K+</h3>
              <p className="text-sm text-gray-300">Users</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-300">2K+</h3>
              <p className="text-sm text-gray-300">Reviews</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-300">95%</h3>
              <p className="text-sm text-gray-300">Accuracy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}