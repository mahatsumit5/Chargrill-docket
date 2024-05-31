"use client";
import OrderForm from "@/components/form/OrderForm";
import UserForm from "@/components/form/UserForm";
import { useAppSelector } from "@/hook";
import React from "react";

interface Components {
  [key: string]: React.ReactNode;
}
function Page() {
  const { display } = useAppSelector((store) => store.cart);
  const components: Components = {
    UserForm: <UserForm />,
    OrderForm: <OrderForm type="new" />,
  };
  return (
    <div className=" rounded-md text-sm shadow-lg p-4 w-full md:w-2/3 border sm:m-4">
      {components[display]}
    </div>
  );
}

export default Page;
