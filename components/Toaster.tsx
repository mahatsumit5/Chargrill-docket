"use client";
import { useToaster } from "@/lib/hook";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

function Toaster() {
  return (
    <div className="absolute top-2   w-full   flex justify-center items-center">
      <ToastContainer />
    </div>
  );
}

function ToastContainer() {
  const { open, toast, description } = useToaster();
  console.log(open);
  return open ? (
    <div className="w-[300px] h-28 bg-slate-300 rounded-lg p-2 shadow-lg flex flex-col">
      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white rounded-full hover:scale-110 transition-all"
          onClick={() => {
            toast();
          }}
        >
          <IoClose size={20} />
        </button>
      </div>
      <p>{description}</p>
    </div>
  ) : null;
}

export default Toaster;
