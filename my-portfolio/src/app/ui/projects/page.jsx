// No "use client" here — this is a SERVER component.
// Data fetching happens on the server, zero client JS for the fetch.
import ProjectCard from "../../components/ProjectCard"; // client component for animations
import projects from "@/data/projects.json";

// ─── Data fetching (server-side) ────────────────────────────────────────────
// Replace this URL with your real API endpoint or local JSON file path.
// Since this is a server component, fetch runs at build time (or per-request
// if you add `cache: "no-store"`).

// ─── Server component ────────────────────────────────────────────────────────
export default function Projects() {
  return (
    // `py-10 sm:py-20 px-3 sm:px-4` — vertical breathing room, responsive horizontal padding on mobile
    <section
      id="projects"
      className="py-10 sm:py-20 px-3 sm:px-4 min-h-screen overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* ── Section heading ── */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs tracking-widest uppercase text-amber-600 dark:text-amber-400 font-mono mb-2">
            Portfolio
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Projects I&apos;ve Built
          </h2>
          <p className="text-xs sm:text-sm text-foreground/50 max-w-md mx-auto leading-relaxed px-2">
            Full-stack products built with the MERN stack, Next.js, and
            TypeScript — each one solving a real problem.
          </p>
        </div>

        {/* ── Grid ──
            - 1 column on mobile (grid-cols-1)
            - 2 columns on md and above (md:grid-cols-2)
            - gap-3 sm:gap-6 — responsive gutter between cards                */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {projects.map((project, i) => (
            // ProjectCard is a client component — it owns the hover + framer
            // motion animations. We pass index `i` for staggered entry delay.
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
