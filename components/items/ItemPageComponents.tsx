"use client";

import { Download, Grid, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function TopHeaderButtons() {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-row">
      <Button variant={"secondary"} className="rounded-full">
        <Grid /> Grid View
      </Button>
      <Button
        variant={"default"}
        className="rounded-full"
        onClick={() => {
          router.push("items/new");
        }}
      >
        <PlusCircle /> New Item
      </Button>
    </div>
  );
}
export { TopHeaderButtons };
