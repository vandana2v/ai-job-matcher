export default function JobCard({ job }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:border-cyan-400/30">
      <h3 className="text-xl font-semibold text-white">
        {job.title}
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        {job.company} • {job.location}
      </p>

      <p className="mt-4 text-sm leading-6 text-gray-300 line-clamp-4">
        {job.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills?.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
          >
            {skill}
          </span>
        ))}
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
  );
}