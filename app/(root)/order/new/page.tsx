import OrderForm from "@/components/form/OrderForm";
import { executeQuery } from "@/database";
import { databaseActionHandle } from "@/database/actions";
import { getCustomerById } from "@/database/actions/customer.action";
import { useParams } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data, error } = await executeQuery(getCustomerById(id));
  const { data: dta2 } = await databaseActionHandle(id, (id) =>
    getCustomerById(id)
  );

  return <div>This is user id {JSON.stringify(data)}</div>;
};

export default page;
