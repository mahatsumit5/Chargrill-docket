import OrderForm from "@/components/form/OrderForm";
import React from "react";

function page() {
  return (
    <div className=" rounded-md text-sm shadow-lg p-4 w-full md:w-2/3 border sm:m-4">
      <OrderForm />
    </div>
  );
}

export default page;
