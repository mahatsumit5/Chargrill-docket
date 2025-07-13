"use client";
import React from "react";
import { Button } from "../ui/button";
import { Link, List, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const ClientSideButton = ({ btnName }: { btnName: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log();
  return !pathname.includes("/new") ? (
    <div className="flex gap-4">
      <Button
        variant={"secondary"}
        className="gap-2"
        size={"sm"}
        onClick={() => {
          console.log("list view changed");
        }}
      >
        <List />
        List View
      </Button>
      <Button
        variant={"default"}
        className="gap-2"
        size={"sm"}
        onClick={() => {
          router.push(pathname + "/new");
        }}
      >
        <Plus />
        {btnName}
      </Button>
    </div>
  ) : null;
};

export default ClientSideButton;
