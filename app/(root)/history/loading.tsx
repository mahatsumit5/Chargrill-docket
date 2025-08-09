import { LoaderOne } from "@/components/ui/loader";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full p-10">
      <p className="text-lg font-semibold animate-pulse">
        <LoaderOne />
      </p>
    </div>
  );
}
