"use client";

import React from "react";
import { Anton } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import CalendarPage from "@/components/FullCalendar";
import { toast } from "sonner";
const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
});

function Page() {
  return (
    <div className="flex flex-col md:flex-row  w-full  gap-5   justify-between py-20">
      <div className="p-10 flex flex-col  items-center justify-center gap-5">
        <h1 className={`${anton.className} text-3xl text-blue-600`}>
          Best ordering services.
        </h1>
        <p className="text-gray-600 ">Order now only at our website.</p>
        <span className="flex gap-5">
          <Button
            onClick={() => {
              console.log("asdfdsf");
              toast("New order cratedf");
            }}
            variant={"default"}
            size={"lg"}
          >
            Create new order
          </Button>
          <Button variant={"outline"}>Explore now</Button>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative w-[500px] h-[500px]">
          <Image
            alt=""
            src={"/assets/landing-image.jpg"}
            className="rounded-full"
            priority
            fill
          />
        </div>

        <span className="absolute bg-white rounded-3xl p-2 top-10 w-56 text-sm right-64 flex items-center justify-between">
          5.0 Ratings
          <FaStar color="red" />
          <FaStar color="red" />
          <FaStar color="red" />
          <FaStar color="red" />
          <FaStar color="red" />
        </span>
      </div>
    </div>
  );
}

export default Page;
