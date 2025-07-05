import OrderForm from "@/components/form/OrderForm";
import UserForm from "@/components/form/UserForm";
import React from "react";

interface Components {
  [key: string]: React.ReactNode;
}
function Page() {
  const components: Components = {
    UserForm: <UserForm />,
  };
  return (
    <div className="  flex flex-col items-center justify-center p-3">
      <p className="text-xl md:text-2xl p-5">Add new customer</p>
      <UserForm />
    </div>
  );
}

export default Page;
