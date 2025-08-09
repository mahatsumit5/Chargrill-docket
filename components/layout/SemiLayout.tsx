"use client";
import React from "react";
import { Subtitle, Title } from "../title/Title";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Download, DownloadIcon, Grid, List, PlusCircle } from "lucide-react";
import { usePathHook } from "@/hooks/usepath";
import { CurrentPath } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setview } from "@/redux/features/view.slice";
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
        <div className="flex flex-col items-start w-full space-y-2 ">
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
        onClick={() => router.push(currentPath + "/new")}
      >
        <PlusCircle /> {props.btnName}
      </Button>
    </div>
  );
}
function DynamicButton() {
  const { currentPath } = usePathHook();
  const path: CurrentPath = currentPath as CurrentPath;
  switch (path) {
    case "orders":
      return (
        <Button variant={"secondary"} className="rounded-full">
          <DownloadIcon />
          Download
        </Button>
      );
    case "items":
      return <SwitchView />;
    case "users":
      return <SwitchView />;
  }
  return <></>;
}

function SwitchView() {
  const { view } = useAppSelector((store) => store.view);
  const dispatch = useAppDispatch();
  return (
    <Button
      variant={"outline"}
      className="rounded-full"
      onClick={() => {
        const payload = view === "grid" ? "list" : "grid";
        dispatch(setview(payload));
      }}
    >
      {view === "grid" ? (
        <>
          <List /> List view
        </>
      ) : (
        <>
          <Grid /> Grid View
        </>
      )}
    </Button>
  );
}

export default SemiLayout;
