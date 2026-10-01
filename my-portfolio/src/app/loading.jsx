import React from "react";
import Spinner from "@/app/components/Spinner";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Spinner size="lg" label="Loading..." />
    </div>
  );
}
