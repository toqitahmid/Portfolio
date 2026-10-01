import React from "react";
import { Navbar } from "@/app/components/Navbar";
import Spinner from "@/app/components/Spinner";

export default function ProjectDetailsLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <Spinner size="lg" label="Loading project details..." />
      </div>
    </>
  );
}
