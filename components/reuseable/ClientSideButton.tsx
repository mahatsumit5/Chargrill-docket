"use client";
import React, { Suspense } from "react";
import { Button } from "../ui/button";
import { Link, List, Plus, Save, User } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ResetIcon } from "@radix-ui/react-icons";
import { useAppDispatch } from "@/hooks";
import { resetCart } from "@/redux/features/cart.slice";

const ClientSideButton = ({ btnName }: { btnName: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    !pathname.includes("/new") && (
      <Suspense>
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
            className="gap-2 hover:bg-primary/75"
            size={"sm"}
            onClick={() => {
              router.push(pathname + "/new");
            }}
          >
            <Plus />
            {btnName}
          </Button>
        </div>
      </Suspense>
    )
  );
};

export default ClientSideButton;
