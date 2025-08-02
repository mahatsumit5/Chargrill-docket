"use client";

import { Download, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

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
function TopHeaderButtons() {
  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <Button variant={"secondary"} className="rounded-full">
        <Download /> Download Report
      </Button>
      <Button variant={"default"} className="rounded-full">
        <PlusCircle /> New Order
      </Button>
    </div>
  );
}
export { DataDisplay, TopHeaderButtons };
