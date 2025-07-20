import UserForm from "@/components/form/UserForm";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-start w-full  gap-2  ">
      <UserForm />
      <div className="p-4 bg-background-secondary rounded-md mt-4 w-full">
        content
      </div>
    </div>
  );
};

export default page;
