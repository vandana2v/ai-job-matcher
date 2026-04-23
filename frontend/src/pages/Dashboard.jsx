export default function Dashboard() {
  const analysis = JSON.parse(localStorage.getItem("analysis") || "{}");

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
            AI Analysis Dashboard
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Resume{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>

          <p className="mt-3 text-gray-400">
            View your extracted skills, top job matches, and improvement suggestions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Extracted Skills */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white mb-4">Extracted Skills</h2>

            {(analysis.resume_skills || []).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {(analysis.resume_skills || []).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No skills extracted yet.</p>
            )}
          </div>

          {/* Top Matching Jobs */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white mb-5">Top Matching Jobs</h2>

            <div className="space-y-5">
              {(analysis.top_matches || []).length > 0 ? (
                (analysis.top_matches || []).map((job, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-cyan-400/30"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-400">
                          {job.company} • {job.location}
                        </p>
                      </div>

                      <span className="inline-block rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-300 border border-green-400/20">
                        {job.match_score}% Match
                      </span>
                    </div>

                    {/* Missing Skills */}
                    <div className="mt-5">
                      <p className="font-medium text-white">Missing Skills</p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {(job.missing_skills || []).length > 0 ? (
                          (job.missing_skills || []).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-sm text-red-300"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">
                            No missing skills identified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="mt-5">
                      <p className="font-medium text-white">Suggestions</p>

                      {(job.suggestions || []).length > 0 ? (
                        <ul className="mt-2 list-disc ml-5 space-y-1 text-sm text-gray-300">
                          {(job.suggestions || []).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-gray-400">
                          No suggestions available
                        </p>
                      )}
                    </div>

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
                ))
              ) : (
                <p className="text-gray-400">No matching jobs available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}