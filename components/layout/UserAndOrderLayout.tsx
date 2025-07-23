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
      <div className="flex justify-between flex-row items-center">
        <h4 className="scroll-m-20 text-md font-bold tracking-tight px-3 text-primary">
          {title}
        </h4>
        <ClientSideButton btnName={btnName} />
      </div>

      {children}
    </div>
  );
};

export default UserAndOrderLayout;
