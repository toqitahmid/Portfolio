// "use client" is required here because:
// 1. framer-motion uses browser APIs (requestAnimationFrame, DOM events)
// 2. hover state and animations are interactive — they need the client
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Animation variants ───────────────────────────────────────────────────────
// Variants let you define named animation states and reuse them cleanly.
// `hidden` = starting state (invisible, shifted down 30px)
// `visible` = end state (fully visible, in natural position)
const cardVariants = {
  hidden: {
    opacity: 0, // fully transparent at start
    y: 30, // 30px below its final position
  },
  visible: {
    opacity: 1, // fully visible
    y: 0, // back to its natural position
  },
};

// ─── ProjectCard (client component) ──────────────────────────────────────────
// Props:
//   project — one project object from the fetched array
//   index   — position in the list, used to stagger animation delays
export default function ProjectCard({ project, index }) {
  return (
    // `motion.div` — a regular div powered by framer-motion.
    // `initial="hidden"`          — starts in the hidden variant state
    // `whileInView="visible"`     — switches to visible when card enters viewport
    // `viewport={{ once: true }}` — animation runs only the first time it appears,
    //                               not every time the user scrolls past it
    // `transition`                — controls how the animation plays:
    //     delay: index * 0.12    — each card is delayed 120ms more than the previous,
    //                              creating a cascading/stagger effect
    //     duration: 0.5          — each card takes 500ms to animate in
    //     ease: "easeOut"        — starts fast, slows down at the end (natural feel)
    // `whileHover`               — slight scale up + shadow on mouse hover
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        delay: index * 0.12,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02, // 2% scale up on hover — subtle lift effect
        transition: { duration: 0.2 }, // hover reacts quickly (200ms)
      }}
      // Card base styles:
      // `rounded-2xl`          — heavily rounded corners
      // `border border-foreground/8` — very faint border, visible on both themes
      // `bg-default/40`        — semi-transparent background (works dark + light)
      // `backdrop-blur-sm`     — frosted glass effect on cards
      // `overflow-hidden`      — clips the image to the card's rounded corners
      // `group`                — allows child elements to react to card hover
      //                          via `group-hover:` Tailwind classes
      className="rounded-xl sm:rounded-2xl border border-foreground/8 bg-default/40 backdrop-blur-sm overflow-hidden group"
    >
      {/* ── Project image ── */}
      {/* `relative h-40 sm:h-52` — responsive fixed height for Image */}
      <div className="relative h-40 sm:h-52 md:h-55 lg:h-70 w-full bg-foreground/5">
        <Image
          // Replace `project.imageUrl` with whatever field name your JSON uses.
          // If you have no image yet, remove the Image and keep the placeholder div.
          src={project.imgUrl}
          alt={project.title}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          fill // fills the parent div completely
          className={[
            "object-cover", // covers the area without distortion
            // `group-hover:scale-105` — image zooms in slightly when card is hovered
            // `transition-transform duration-500` — smooth 500ms zoom
            "group-hover:scale-105 transition-transform duration-500",
          ].join(" ")}
        />
      </div>

      {/* ── Card body ── */}
      <div className="p-3 sm:p-4 md:p-6">
        {/* Project title */}
        <h3 className="text-base sm:text-lg font-bold mb-2">{project.title}</h3>

        {/* Description — two lines max on desktop to keep cards uniform height */}
        <p className="text-xs sm:text-sm text-foreground/55 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* ── Tech stack chips ── */}
        {/* `flex-wrap` — chips wrap to a new line if there are too many */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              // Pill badge — amber toned to match the site's accent colour
              className="text-[9px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}{" "}
        </div>

        {/* ── Challenge line ── */}
        {/* Shows the main challenge/learning from this project */}
        <p className="text-[10px] sm:text-[12px] text-foreground/40 mb-3 sm:mb-5 leading-relaxed">
          <span className="font-semibold text-foreground/60">Challenge: </span>
          {project.challenge}
        </p>

        {/* ── Action buttons ── */}
        <div className="flex gap-2 sm:gap-3">
          {/* GitHub link — ghost style (border only, no fill) */}
          <Link
            href={project.githubUrl}
            target="_blank" // opens in new tab
            rel="noopener noreferrer" // security best practice for target="_blank"
            className={[
              "text-[10px] sm:text-xs font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg",
              "border border-foreground/15",
              "text-foreground/60",
              // Hover: border and text brighten slightly
              "hover:border-foreground/40 hover:text-foreground",
              "transition-colors duration-200 whitespace-nowrap",
            ].join(" ")}
          >
            GitHub
          </Link>

          {/* Live preview link — filled amber button */}
          <Link
            href={project.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "text-[10px] sm:text-xs font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg",
              "bg-amber-500 text-white",
              // Hover: darkens the amber slightly
              "hover:bg-amber-600",
              "transition-colors duration-200 whitespace-nowrap",
            ].join(" ")}
          >
            Live Preview
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
