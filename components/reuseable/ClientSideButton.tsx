"use client";
import React from "react";
import { Button } from "../ui/button";
import { Link, List, Plus } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const ClientSideButton = ({ btnName }: { btnName: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  console.log(params);
  return !pathname.includes("/new") ? (
    <div className="flex gap-4">
      <Button
        variant={"secondary"}
        className="gap-2"
        size={"sm"}
        onClick={() => {
          router.replace(`${pathname}?view=list`);
        }}
      >
        <List />
        List View
      </Button>
      <Button
        variant={"secondary"}
        className="gap-2"
        size={"sm"}
        onClick={() => {
          router.replace(`${pathname}?view=grid`);
        }}
      >
        <List />
        Grid
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
