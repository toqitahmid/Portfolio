"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DiGithub } from "react-icons/di";
import { ArrowUpRight, Eye } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const MAX_VISIBLE_TECH = 4;

export default function ProjectCard({ project, index }) {
  const visibleTech = project.technologies.slice(0, MAX_VISIBLE_TECH);
  const extraTechCount = project.technologies.length - visibleTech.length;
  
  return (
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
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="rounded-xl sm:rounded-2xl border border-foreground/8 bg-default/40 backdrop-blur-sm overflow-hidden group flex flex-col"
    >
      {/* ── Project image ── */}
      <div className="relative h-40 sm:h-52 md:h-55 lg:h-70 w-full bg-foreground/5">
        <Image
          src={project.imageUrl}
          alt={project.title}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* ── Card body ── */}
      <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold mb-2">{project.title}</h3>

        <p className="text-xs sm:text-sm text-foreground/55 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* ── Tech stack chips ── */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-5">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="text-[9px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
          {extraTechCount > 0 && (
            <span className="text-[9px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full bg-foreground/5 text-foreground/50 border border-foreground/10 whitespace-nowrap">
              +{extraTechCount} more
            </span>
          )}
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto pt-1">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground transition-colors duration-200 whitespace-nowrap"
          >
            <DiGithub size={13} />
            GitHub
          </Link>

          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-200 whitespace-nowrap"
          >
            <ArrowUpRight size={13} />
            Live Preview
          </Link>

          <Link
            href={`/ui/projects/${project._id}`}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground transition-colors duration-200 whitespace-nowrap ml-auto"
          >
            <Eye size={13} />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
