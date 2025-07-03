"use client";
import OrderForm from "@/components/form/OrderForm";
import UserForm from "@/components/form/UserForm";
import { useAppSelector } from "@/hooks";
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
    <div className=" rounded-md text-sm  p-5 shadow-lg m-5">
      {components[display]}
    </div>
  );
}

export default Page;
