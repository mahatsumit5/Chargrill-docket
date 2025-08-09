"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MoonStar, Search, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

function DisplayCurrentPage() {
  const pathname = usePathname();
  const path = pathname.split("/").filter((item) => item !== "");
  return (
    <p className="uppercase font-bold text-primary-foreground">{path[0]}</p>
  );
}
function SwitchTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={"outline"}
      size={"sm"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hover:bg-secondary"
    >
      {theme === "light" ? (
        <Sun color="gold" className="animate-spin" />
      ) : (
        <MoonStar color="skyblue" className="animate-bounce" />
      )}
    </Button>
  );
}
function TriggerSideBar() {
  return <SidebarTrigger className="text-white" />;
}
function DesktopView() {
  const router = useRouter();
  return (
    <div className=" w-full  bg-primary">
      <header className=" flex w-full justify-between items-center p-2   max-w-[1400px] m-auto">
        <div className="flex gap-5 justify-start items-center  w-full">
          <TriggerSideBar />

          <Input
            className="w-[350px]  rounded-full h-6 hidden md:block bg-background dark:bg-background/60 hover:bg-background/85 text-foreground "
            type="text"
            placeholder="search......"
          />
        </div>
        <DisplayCurrentPage />
        <div className="flex w-full justify-end gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              router.push("/cart");
            }}
            className="hover:bg-secondary hidden md:flex"
          >
            <ShoppingCart />
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            className="hover:bg-secondary flex md:hidden"
          >
            <Search />
          </Button>
          <SwitchTheme />
        </div>
      </header>
    </div>
  );
}
function MobileView() {
  return (
    <div className=" w-full  bg-primary block sm:hidden">
      <header className=" flex w-full justify-between items-center p-2   max-w-[1400px] m-auto">
        <div className="flex gap-5 justify-start items-center  w-full">
          <TriggerSideBar />
          <Input
            className="w-[250px]  rounded-full h-6 hidden md:block bg-white dark:bg-white/65  "
            type="text"
            placeholder="search......"
          />
        </div>
        <div className="flex w-full justify-end gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            className="hover:bg-secondary"
          >
            <Search />
          </Button>
          <SwitchTheme />
        </div>
      </header>
    </div>
  );
}

export { DesktopView, MobileView };
