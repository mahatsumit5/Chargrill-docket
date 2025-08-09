"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LucideShoppingCart, SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";

export function Header() {
  const router = useRouter();
  return (
    <div className=" w-full border-b ">
      <header className=" flex w-full justify-between items-center p-2 ">
        <div className="flex items-center">
          <TriggerSideBar />
          <DisplayCurrentPage />
        </div>

        <SearchBar />
        {/* <DisplayCurrentPage /> */}
        <div className="flex  gap-2">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              router.push("/cart");
            }}
            className=" hidden md:flex"
          >
            <LucideShoppingCart />
          </Button>
          <Button variant={"ghost"} size={"sm"} className=" flex md:hidden">
            <SearchIcon />
          </Button>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    </div>
  );
}

function DisplayCurrentPage() {
  const pathname = usePathname();
  const path = pathname.split("/").filter((item) => item !== "");
  return (
    <p className=" font-bold text-primary uppercase block md:hidden">
      {path[0]}
    </p>
  );
}

function TriggerSideBar() {
  return <SidebarTrigger className="" />;
}

function SearchBar() {
  return (
    <div className=" rounded-full md:flex items-center h-6 w-[300px] lg:w-[450px] gap-0 hidden ">
      <Input
        className="w-full  rounded-l-full h-6  bg-secondary  dark:bg-seconadary hover:bg-accent/85 text-secondary-foreground "
        type="text"
        placeholder="search......"
      />
      <Button
        variant={"ghost"}
        className="bg-accent rounded-r-full h-10 w-[60px] flex items-center justify-center border"
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
