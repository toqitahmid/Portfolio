"use client";

import { motion } from "framer-motion";

const skills = [
  {
    name: "React",
    emoji: "⚛️",
    desc: "Built responsive frontend applications with reusable components, hooks, API integration, and modern UI patterns.",
    level: 90,
    status: "Advanced",
    experience: "6+ months",
  },
  {
    name: "Next.js",
    emoji: "▲",
    desc: "Developed full-stack applications using App Router, server actions, SSR, authentication, and optimized performance.",
    level: 88,
    status: "Advanced",
    experience: "6+ months",
  },
  {
    name: "Node.js",
    emoji: "🟩",
    desc: "Created backend services, REST APIs, authentication systems, and scalable server-side applications.",
    level: 85,
    status: "Proficient",
    experience: "6+ months",
  },
  {
    name: "Express.js",
    emoji: "🚂",
    desc: "Built RESTful APIs, middleware systems, route handling, and backend architecture for MERN applications.",
    level: 84,
    status: "Proficient",
    experience: "6+ months",
  },
  {
    name: "MongoDB",
    emoji: "🍃",
    desc: "Designed database schemas, CRUD operations, aggregation pipelines, and integrated MongoDB with MERN applications.",
    level: 82,
    status: "Proficient",
    experience: "6+ months",
  },
  {
    name: "TypeScript",
    emoji: "🟦",
    desc: "Used TypeScript for type-safe frontend and backend development to improve maintainability and scalability.",
    level: 78,
    status: "Intermediate",
    experience: "5+ months",
  },
  {
    name: "Tailwind CSS",
    emoji: "🎨",
    desc: "Built modern responsive UI designs with Tailwind CSS, dark mode support, animations, and reusable styling systems.",
    level: 92,
    status: "Advanced",
    experience: "6+ months",
  },
  {
    name: "Better Auth",
    emoji: "🔐",
    desc: "Implemented secure authentication systems including session handling, protected routes, and credential-based login flows.",
    level: 75,
    status: "Intermediate",
    experience: "3+ months",
  },
  {
    name: "DSA",
    emoji: "🧠",
    desc: "Practicing data structures and algorithms to improve problem-solving, optimization, and coding interview preparation.",
    level: 72,
    status: "Intermediate",
    experience: "Ongoing",
  },
];

// ── Animation variants ──────────────────────────────────────────────────────

// Card slide in from left or right
const cardVariants = (dir) => ({
  hidden: {
    opacity: 0,
    x: dir === "left" ? -60 : 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
});

// Dot pop in
const dotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "backOut" },
  },
};

// Progress bar fill
const barVariants = (level) => ({
  hidden: { width: 0 },
  visible: {
    width: `${level}%`,
    transition: { duration: 0.9, ease: "easeOut", delay: 0.3 },
  },
});

// Heading fade up
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ── Main component ───────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen py-20 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headingVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            MERN Stack Expertise
          </h2>
          <p className="max-w-4xl mx-auto text-muted-foreground sm:text-center text-justify leading-8 text-base md:text-lg mb-20">
            Full-stack developer with 6+ months of hands-on experience building
            scalable MERN applications using React, Next.js, Node.js,
            Express.js, MongoDB, and TypeScript. Passionate about backend
            architecture, authentication systems, clean UI design, and solving
            real-world problems through code.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pt-10">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-amber-600/70 -translate-x-1/2" />

          {/* Mobile side line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-[2px] bg-amber-600/70" />

          <div className="space-y-14">
            {skills.map((s, i) => (
              <div
                key={s.name}
                className="relative flex md:grid md:grid-cols-2 md:gap-10"
              >
                {/* Mobile layout */}
                <div className="md:hidden flex w-full gap-5">
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-amber-600 z-10 mt-6"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={dotVariants}
                    />
                  </div>
                  <SkillCard s={s} dir="right" />
                </div>

                {/* Desktop left column */}
                <div className="hidden md:flex justify-end">
                  {i % 2 === 0 ? <SkillCard s={s} dir="left" /> : <div />}
                </div>

                {/* Desktop right column */}
                <div className="hidden md:flex justify-start">
                  {i % 2 !== 0 ? <SkillCard s={s} dir="right" /> : <div />}
                </div>

                {/* Desktop center dot */}
                <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2">
                  <motion.div
                    className="w-5 h-5 rounded-full bg-amber-600 border-4 border-background z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={dotVariants}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SkillCard ────────────────────────────────────────────────────────────────
function SkillCard({ s, dir }) {
  return (
    <motion.div
      className="w-full max-w-md bg-default/60 dark:bg-default/20 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-6 hover:scale-[1.02]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants(dir)}
      whileHover={{ scale: 1.03 }}
    >
      {/* Top: emoji + name + desc + badges */}
      <div className="flex items-start gap-4">
        <div className="text-3xl">{s.emoji}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">{s.name}</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-6">
            {s.desc}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
              {s.status}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-medium">
              {s.experience}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Skill Proficiency</span>
          <span>{s.level}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={barVariants(s.level)}
          />
        </div>
      </div>
    </motion.div>
  );
}
