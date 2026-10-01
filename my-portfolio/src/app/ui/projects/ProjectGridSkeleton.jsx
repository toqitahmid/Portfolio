import React from "react";

export default function ProjectGridSkeleton({ count = 4 }) {
  return (
    <section className="py-10 sm:py-30 px-3 sm:px-4 min-h-screen overflow-x-hidden relative select-none">
      {/* ── Ambient Glow Behind Section ── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/10 dark:bg-amber-400/5 blur-[120px] pointer-events-none -z-10 animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="lg:w-8/12 md:w-11/12 w-11/12 mx-auto">
        {/* ── Heading Skeleton ── */}
        <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
          <div className="h-8 sm:h-10 w-56 sm:w-72 rounded-xl bg-foreground/10 skeleton-shimmer mb-3" />
          <div className="h-4 w-48 sm:w-64 rounded bg-foreground/10 skeleton-shimmer" />
        </div>

        {/* ── Grid of Project Card Skeletons ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:mt-20 mt-10">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl sm:rounded-2xl border border-foreground/10 bg-default/30 backdrop-blur-sm overflow-hidden flex flex-col"
            >
              {/* Card Cover Image Skeleton */}
              <div className="relative h-40 sm:h-52 md:h-55 lg:h-70 w-full bg-foreground/5 skeleton-shimmer border-b border-foreground/5 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400/50 animate-ping" />
                </div>
              </div>

              {/* Card Body Skeleton */}
              <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1 space-y-3">
                {/* Title */}
                <div className="h-6 w-3/5 rounded-lg bg-foreground/10 skeleton-shimmer" />

                {/* Description lines */}
                <div className="space-y-2">
                  <div className="h-3.5 w-full rounded bg-foreground/10 skeleton-shimmer" />
                  <div className="h-3.5 w-4/5 rounded bg-foreground/10 skeleton-shimmer" />
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {[64, 76, 56, 84].map((width, idx) => (
                    <div
                      key={idx}
                      style={{ width: `${width}px` }}
                      className="h-6 rounded-full bg-amber-500/10 border border-amber-500/20 skeleton-shimmer"
                    />
                  ))}
                </div>

                {/* Bottom action buttons */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-foreground/5">
                  <div className="flex gap-2">
                    <div className="h-8 w-16 rounded-lg bg-foreground/10 skeleton-shimmer" />
                    <div className="h-8 w-20 rounded-lg bg-foreground/10 skeleton-shimmer" />
                  </div>
                  <div className="h-8 w-24 rounded-lg bg-amber-500/25 border border-amber-500/30 skeleton-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
