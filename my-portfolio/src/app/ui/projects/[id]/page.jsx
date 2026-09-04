import { getServerSession } from "@/app/lib/get-session";
import { ArrowUpRight, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DiGithub } from "react-icons/di";

async function getProject(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${apiUrl}/api/projects/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
const ProjectDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log(id);
   const project = await getProject(id);

   const session = await getServerSession();
   const user = session?.user;

   if (!project) {
     return (
       <section className="min-h-screen flex items-center justify-center px-4">
         <div className="text-center">
           <h1 className="text-xl font-bold mb-2">Project not found</h1>
           <Link href="/" className="text-sm text-amber-500 hover:underline">
             Back to projects
           </Link>
         </div>
       </section>
     );
   }
  return (
    <section className="py-10 sm:py-16 px-3 sm:px-4 min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        {/* ── Cover image ── */}
        <div className="relative h-48 sm:h-72 md:h-96 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-foreground/5 mb-6 sm:mb-8">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* ── Title + actions ── */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {project.title}
          </h1>

          <div className="flex gap-2">
            {user && (
              <Link
                href={`/ui/projects/${id}/edit`}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground transition-colors duration-200"
              >
                <Pencil size={13} />
                Edit
              </Link>
            )}
          
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-6 sm:mb-8">
          {project.description}
        </p>

        {/* ── Tech stack ── */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xs sm:text-sm font-semibold text-foreground/70 mb-2 sm:mb-3">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Features + Challenges side by side ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-10">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-foreground/70 mb-2 sm:mb-3">
              Features
            </h2>
            <ul className="space-y-1.5 sm:space-y-2">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-foreground/55 leading-relaxed pl-3 border-l-2 border-amber-500/30"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-foreground/70 mb-2 sm:mb-3">
              Challenges
            </h2>
            <ul className="space-y-1.5 sm:space-y-2">
              {project.challenges.map((challenge, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-foreground/55 leading-relaxed pl-3 border-l-2 border-foreground/15"
                >
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Links ── */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-4 py-2 sm:py-2.5 rounded-lg border border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground transition-colors duration-200"
          >
            <DiGithub size={15} />
            GitHub
          </Link>

          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-4 py-2 sm:py-2.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-200"
          >
            <ArrowUpRight size={15} />
            Live Preview
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsPage;
