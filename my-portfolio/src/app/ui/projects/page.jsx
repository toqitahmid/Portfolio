import ProjectCard from "./ProjectCard";

async function getProjects() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${apiUrl}/api/projects`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section
      id="projects"
      className="py-10 sm:py-20 px-3 sm:px-4 min-h-screen overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* ── Section heading ── */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Projects I&apos;ve Built
          </h2>
          <p className="text-xs sm:text-sm text-foreground/50 max-w-md mx-auto leading-relaxed px-2">
            Full-stack products built with the MERN stack, Next.js
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-sm text-foreground/50">
            No projects found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
