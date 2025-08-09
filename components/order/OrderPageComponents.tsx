"use client";

import { Download, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function DataDisplay() {
  return (
    <div className="grid gap-2 w-full grid-cols-2 sm:grid-cols-4 ">
      {Array(4)
        .fill("")
        .map((item, index) => (
          <div key={index} className="w-full h-28 bg-card p-4 rounded-md">
            ss
          </div>
        ))}
    </div>
  );
}

export { DataDisplay };
