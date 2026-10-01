import React from "react";
import Spinner from "@/app/components/Spinner";

export default function ProjectsLoading() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <Spinner size="lg" label="Loading projects..." />
    </div>
  );
}
