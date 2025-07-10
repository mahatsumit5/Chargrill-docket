import React from "react";
import ClientSideButton from "../reuseable/ClientSideButton";

const UserAndOrderLayout = ({
  children,
  btnName,
  title,
}: {
  children: React.ReactNode;
  btnName: string;
  title: string;
}) => {
  return (
    <div className="flex flex-col w-full  ">
      <div className="flex justify-between flex-col gap-3 sm:flex-row">
        <h4 className="scroll-m-20 text-md md:text-xl font-semibold tracking-tight px-3">
          {title}
        </h4>
        <ClientSideButton btnName={btnName} />
      </div>

      {children}
    </div>
  );
};

export default UserAndOrderLayout;
