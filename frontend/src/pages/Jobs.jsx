import { useEffect, useState } from "react";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      let url = "/jobs?";
      if (keyword) url += `keyword=${encodeURIComponent(keyword)}&`;
      if (location) url += `location=${encodeURIComponent(location)}&`;

      const res = await api.get(url);
      setJobs(res.data);
    } catch (err) {
      setError("Failed to load jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div
      className="min-h-screen px-6 pt-28 pb-10"
      style={{
        background:
          "radial-gradient(circle at top left, #0f172a 0%, #020617 40%, #111827 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300 mb-3">
            AI Job Search
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Find Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Dream Job
            </span>
          </h1>

          <p className="mt-3 text-gray-400">
            Explore real jobs and find the best match for your skills
          </p>
        </div>

        {/* Search Bar */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl">
          <input
            type="text"
            placeholder="Search by role, company, skill"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Search by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400"
          />

          <button
            onClick={fetchJobs}
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 px-4 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
          >
            Search Jobs
          </button>
        </div>

        {/* Loading / Error / Empty */}
        {loading && (
          <p className="text-center text-gray-300 mb-6">Loading jobs...</p>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-red-300">
            {error}
          </div>
        )}

        {!loading && jobs.length === 0 && !error && (
          <p className="text-center text-gray-400">No jobs found.</p>
        )}

        {/* Job Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={job.id || index}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:border-cyan-400/30"
            >
              <h2 className="text-xl font-semibold text-white">
                {job.title}
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {job.company} • {job.location}
              </p>

              <p className="mt-4 text-sm leading-6 text-gray-300 line-clamp-4">
                {job.description}
              </p>

              {job.skills && job.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {job.apply_url && (
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-105"
                >
                  Apply Now
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}