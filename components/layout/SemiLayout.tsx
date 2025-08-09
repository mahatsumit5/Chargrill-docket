"use client";
import React from "react";
import { Subtitle, Title } from "../title/Title";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Download, PlusCircle } from "lucide-react";
import { usePathHook } from "@/hooks/usepath";
type CurrentPath = "orders" | "users" | "items";
function SemiLayout({
  children,
  subTitle,
  title,
  btnName,
}: {
  children: React.ReactNode;
  subTitle: string;
  title: string;
  btnName: string;
}) {
  return (
    <div className="flex flex-col w-full gap-2 ">
      <div className="flex justify-between w-full items-start flex-col gap-5 lg:flex-row">
        <div className="flex flex-col items-start w-full">
          <Title title={title} />
          <Subtitle subTitle={subTitle} />
        </div>
        <TopHeaderButtons btnName={btnName} />
      </div>

      {children}
    </div>
  );
}

function TopHeaderButtons(props: { btnName: string }) {
  const router = useRouter();
  const { path, currentPath } = usePathHook();
  const hideButtons = currentPath === "new";
  return (
    <div className={`${hideButtons ? "hidden" : "flex gap-2 flex-row "}`}>
      <DynamicButton />
      <Button
        variant={"default"}
        className="rounded-full"
        onClick={() => router.push("/new")}
      >
        <PlusCircle /> {props.btnName}
      </Button>
    </div>
  );
}
function DynamicButton() {
  const { currentPath } = usePathHook();
  console.log(currentPath);
  return <></>;
}

export default SemiLayout;
