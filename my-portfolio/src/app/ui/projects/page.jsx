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
    // `py-20 px-4` — vertical breathing room, horizontal padding on mobile
    <section id="projects" className="py-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* ── Section heading ── */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase text-amber-600 dark:text-amber-400 font-mono mb-2">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Projects I&apos;ve Built
          </h2>
          <p className="text-sm text-foreground/50 max-w-md mx-auto leading-relaxed">
            Full-stack products built with the MERN stack, Next.js, and
            TypeScript — each one solving a real problem.
          </p>
        </div>

        {/* ── Grid ──
            - 1 column on mobile (grid-cols-1)
            - 2 columns on md and above (md:grid-cols-2)
            - gap-6 — 24px gutter between cards                */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
