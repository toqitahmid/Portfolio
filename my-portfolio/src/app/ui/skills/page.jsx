"use client";

import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiNodedotjs,
  SiMongodb,
  SiVercel,
  SiRender,
  SiGit,
  SiGithub,
  SiSocketdotio,
} from "react-icons/si";
import { FaShieldAlt } from "react-icons/fa";

const skills = [
  { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26] border-[#E34F26]/30" },
  { name: "CSS3", icon: SiCss, color: "text-[#1572B6] border-[#1572B6]/30" },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "text-[#06B6D4] border-[#06B6D4]/30",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-[#F7DF1E] border-[#F7DF1E]/30",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-[#3178C6] border-[#3178C6]/30",
  },
  {
    name: "React JS",
    icon: SiReact,
    color: "text-[#61DAFB] border-[#61DAFB]/30",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color:
      "text-slate-900 dark:text-white border-slate-300 dark:border-white/30",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color:
      "text-slate-900 dark:text-white border-slate-300 dark:border-white/30",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "text-[#339933] border-[#339933]/30",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-[#47A248] border-[#47A248]/30",
  },
  {
    name: "Better Auth",
    icon: FaShieldAlt,
    color: "text-[#6366F1] border-[#6366F1]/30",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color:
      "text-slate-900 dark:text-white border-slate-300 dark:border-white/30",
  },
  {
    name: "Render",
    icon: SiRender,
    color: "text-[#46E3B7] border-[#46E3B7]/30",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "text-[#F05032] border-[#F05032]/30",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "text-slate-900 dark:text-white border-slate-300 dark:border-white/30",
  },
  {
    name: "Socket.io",
    icon: SiSocketdotio,
    color: "text-slate-900 dark:text-white border-slate-300 dark:border-white/30",
  },
];

const row1 = skills.slice(0, 8);
const row2 = skills.slice(8, 16);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen py-10 sm:py-20 lg:w-8/12 md:w-11/12 w-11/12 mx-auto px-4 transition-colors duration-300"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 transition-colors duration-300"
        >
          Technical Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base transition-colors duration-300"
        >
          Technologies and tools I work with daily
        </motion.p>
      </div>

      <div className="relative flex flex-col gap-8 overflow-hidden w-full max-w-full sm:mt-40 mt-20">
        {/* Row 1 - Left to Right */}
        <div className="flex w-max animate-marquee gap-4 sm:gap-6 hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={`row1-${skill.name}-${index}`}
                className={`group flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm dark:shadow-md transition-all duration-300 hover:scale-105 ${skill.color}`}
              >
                <Icon className="w-10 h-10 mb-3 transition-all duration-300 group-hover:grayscale group-hover:opacity-50" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors duration-300 group-hover:text-slate-500 dark:group-hover:text-slate-400 text-center">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex w-max animate-marquee-reverse gap-4 sm:gap-6 hover:[animation-play-state:paused]">
          {[...row2, ...row2].map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={`row2-${skill.name}-${index}`}
                className={`group flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm dark:shadow-md transition-all duration-300 hover:scale-105 ${skill.color}`}
              >
                <Icon className="w-10 h-10 mb-3 transition-all duration-300 group-hover:grayscale group-hover:opacity-50" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors duration-300 group-hover:text-slate-500 dark:group-hover:text-slate-400 text-center">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Gradient overlays for smooth fading edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent dark:from-background"></div>
      </div>
    </section>
  );
}
