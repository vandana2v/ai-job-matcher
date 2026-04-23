import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-wide text-white">
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            AI
          </span>{" "}
          Job Matcher
        </Link>

        <div className="flex items-center gap-5 md:gap-6 text-sm md:text-base font-medium">
          <Link to="/" className="text-white/90 hover:text-cyan-300 transition">
            Home
          </Link>

          <Link to="/jobs" className="text-white/90 hover:text-cyan-300 transition">
            Jobs
          </Link>

          <Link to="/upload" className="text-white/90 hover:text-cyan-300 transition">
            Upload Resume
          </Link>

          {token ? (
            <button
              onClick={handleLogout}
              className="rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-5 py-2 text-white shadow-lg transition duration-300 hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-white backdrop-blur-md transition duration-300 hover:bg-white/20"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}