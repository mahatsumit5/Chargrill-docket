import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full p-10">
      <p className="text-lg font-semibold animate-pulse">Loading orders...</p>
    </div>
  );
}
