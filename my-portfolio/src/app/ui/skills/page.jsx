// "use client" tells Next.js this component runs in the browser, not on the server.
// Required because we use browser-only features (window, DOM, etc.)
"use client";

// We only need the data array — no useEffect, no useRef, no useState.
// tailwindcss-animate handles everything with pure CSS classes.

// ─── Skills data ───────────────────────────────────────────────────────────
// Each object describes one skill card.
// - emoji:      visual icon shown at the top of the card
// - desc:       one sentence about what you actually built/used with it
// - level:      number 0–100 shown in the progress bar
// - status:     badge label (Advanced / Proficient / Intermediate)
// - experience: how long you've used it
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

// ─── Main component ─────────────────────────────────────────────────────────
export default function Skills() {
  // No useEffect needed at all.
  // tailwindcss-animate's `animate-in` classes trigger as soon as the element
  // enters the DOM. We use `animation-delay` to stagger each card.

  return (
    // `min-h-screen` — section fills at least the full viewport height
    // `py-20`        — 80px top/bottom padding so content breathes
    // `flex items-center justify-center` — vertically + horizontally centered
    <section
      id="skills"
      className="min-h-screen py-20 flex items-center justify-center"
    >
      {/* max-w-6xl — caps width on large screens so text stays readable */}
      <div className="w-full max-w-6xl px-6">
        {/* ── Heading block ── */}
        <div className="text-center mb-16">
          {/* Large bold heading — scales from 4xl on mobile to 5xl on md+ */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            MERN Stack Expertise
          </h2>

          {/* Intro paragraph — muted color so it feels secondary to the heading */}
          {/* `text-justify` on mobile, `text-center` on sm+ for readability */}
          <p className="max-w-4xl mx-auto text-muted-foreground sm:text-center text-justify leading-8 text-base md:text-lg mb-20">
            Full-stack developer with 6+ months of hands-on experience building
            scalable MERN applications using React, Next.js, Node.js,
            Express.js, MongoDB, and TypeScript. Passionate about backend
            architecture, authentication systems, clean UI design, and solving
            real-world problems through code.
          </p>
        </div>

        {/* ── Timeline wrapper ── */}
        {/* `relative` is required so the absolutely positioned center/side
            lines are positioned relative to this container, not the viewport */}
        <div className="relative pt-10">
          {/* Desktop center line — only visible on md and above (`hidden md:block`)
              `left-1/2 -translate-x-1/2` centers it exactly
              `top-0 bottom-0` stretches it the full height of the timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-amber-600/70 -translate-x-1/2" />

          {/* Mobile side line — only visible below md (`md:hidden`)
              `left-5` places it 20px from the left edge
              Cards sit to its right with a gap */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-[2px] bg-amber-600/70" />

          {/* Loop over every skill and render a timeline row */}
          <div className="space-y-14">
            {skills.map((s, i) => (
              // `relative` — needed so the desktop center dot (absolute) positions
              // relative to this row, not the whole page
              <div
                key={s.name}
                className="relative flex md:grid md:grid-cols-2 md:gap-10"
              >
                {/* ── MOBILE layout ── */}
                {/* Only shown below md. Uses flexbox: dot on the left, card on the right */}
                <div className="md:hidden flex w-full gap-5">
                  {/* Amber dot sitting on the mobile side line */}
                  {/* `mt-6` nudges it down to align with the card's top area */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-amber-600 z-10 mt-6" />
                  </div>

                  {/* Card — always slides in from the right on mobile */}
                  {/* animationDelay staggers each card by 100ms so they cascade */}
                  <SkillCard s={s} dir="right" delay={i * 100} />
                </div>

                {/* ── DESKTOP LEFT column ── */}
                {/* Even-indexed skills (0,2,4…) go on the left */}
                {/* `justify-end` pushes the card flush against the center line */}
                <div className="hidden md:flex justify-end">
                  {i % 2 === 0 ? (
                    <SkillCard s={s} dir="left" delay={i * 100} />
                  ) : (
                    // Empty div keeps the grid column occupied so the right card
                    // still appears in the right column
                    <div />
                  )}
                </div>

                {/* ── DESKTOP RIGHT column ── */}
                {/* Odd-indexed skills (1,3,5…) go on the right */}
                {/* `justify-start` pushes the card flush against the center line */}
                <div className="hidden md:flex justify-start">
                  {i % 2 !== 0 ? (
                    <SkillCard s={s} dir="right" delay={i * 100} />
                  ) : (
                    <div />
                  )}
                </div>

                {/* Desktop center dot — absolutely centered on the vertical line */}
                {/* `border-4 border-background` punches a hole so the line
                    appears to pass through the dot, not be covered by it */}
                <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2">
                  <div className="w-5 h-5 rounded-full bg-amber-600 border-4 border-background z-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SkillCard sub-component ─────────────────────────────────────────────────
// Props:
//   s     — the skill object from the array above
//   dir   — "left" | "right" — controls which direction the card slides in from
//   delay — milliseconds to wait before the animation starts (for staggering)
function SkillCard({ s, dir, delay }) {
  return (
    <div
      className={[
        // ── Base card styles ──
        "w-full max-w-md", // width constraint
        "bg-default/60 dark:bg-default/20", // translucent background, darker in dark mode
        "backdrop-blur-md", // frosted-glass blur effect
        "border border-white/10", // very subtle white border
        "shadow-xl", // deep shadow for depth
        "rounded-2xl p-6", // rounded corners + inner padding
        "hover:scale-[1.02]", // subtle lift on hover

        // ── tailwindcss-animate classes ──
        // `animate-in`              — opt this element into the entry animation
        // `fade-in`                 — opacity goes from 0 → 1
        // `slide-in-from-left-8`   — starts 2rem to the LEFT, slides to 0
        // `slide-in-from-right-8`  — starts 2rem to the RIGHT, slides to 0
        // Only one slide direction is applied depending on the `dir` prop.
        "animate-in fade-in",
        dir === "left" ? "slide-in-from-left-8" : "slide-in-from-right-8",

        // `duration-700`  — the animation takes 700ms to complete
        // `ease-out`      — starts fast, decelerates to a smooth stop
        // `fill-mode-both`— element stays hidden before the delay starts,
        //                   and stays in its final state after the animation ends.
        //                   Without this, cards would flash visible before animating.
        "duration-700 ease-out fill-mode-both",
      ].join(" ")}
      // `animationDelay` is an inline style because Tailwind can't generate
      // arbitrary delay values like `delay-[300ms]` at runtime from a variable.
      // We pass the delay in milliseconds as a string e.g. "300ms"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* ── Card top: emoji + name + description + badges ── */}
      <div className="flex items-start gap-4">
        {/* Emoji icon — text-3xl makes it large enough to read at a glance */}
        <div className="text-3xl">{s.emoji}</div>

        <div className="flex-1">
          {/* Skill name — bold, slightly larger than body text */}
          <h3 className="text-xl font-bold">{s.name}</h3>

          {/* Description — muted color, relaxed line-height for readability */}
          <p className="text-sm text-muted-foreground mt-2 leading-6">
            {s.desc}
          </p>

          {/* Badge row — two pill badges side by side */}
          <div className="flex flex-wrap gap-2 mt-4">
            {/* Status badge (Advanced / Proficient / Intermediate)
                `bg-primary/10` — 10% opacity of the theme's primary color
                `text-primary`  — full primary color for the text */}
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
              {s.status}
            </span>

            {/* Experience badge — amber toned to match the timeline accent */}
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-medium">
              {s.experience}
            </span>
          </div>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="mt-6">
        {/* Label row: "Skill Proficiency" on the left, percentage on the right */}
        <div className="flex justify-between text-sm mb-2">
          <span>Skill Proficiency</span>
          <span>{s.level}%</span>
        </div>

        {/* Track — the grey background bar */}
        {/* `overflow-hidden` clips the fill bar to the track's rounded corners */}
        <div className="h-3 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          {/* Fill — inline `width` sets exactly how full the bar appears.
              Gradient from amber-500 → orange-500 matches the amber timeline accent */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            style={{ width: `${s.level}%` }}
          />
        </div>
      </div>
    </div>
  );
}
