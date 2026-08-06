"use client";
import React, { useEffect, useState, Suspense } from "react";

const StarBackgroundLazy = React.lazy(() => import("./StarBackground"));

export default function StarBackgroundClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <StarBackgroundLazy />
    </Suspense>
  );
}
