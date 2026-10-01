import React from "react";

export default function Spinner({
  size = "lg",
  label = "Loading...",
  className = "",
}) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-12 h-12 sm:w-14 sm:h-14 border-3",
  };

  const ringSize = sizeClasses[size] || sizeClasses.lg;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Soft Ambient Glow */}
        <div
          className="absolute w-20 h-20 rounded-full bg-amber-500/15 dark:bg-amber-400/10 blur-xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Clean Rotating Ring Spinner */}
        <div
          className={`${ringSize} rounded-full border-foreground/15 border-t-amber-500 dark:border-t-amber-400 animate-spin`}
          style={{ willChange: "transform" }}
        />
      </div>

      {label && (
        <p className="text-xs sm:text-sm font-medium tracking-wide text-foreground/60 select-none">
          {label}
        </p>
      )}

      <span className="sr-only">{label || "Loading..."}</span>
    </div>
  );
}
