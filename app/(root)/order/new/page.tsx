import { getAllCustomers } from "@/database/actions/customer.action";
import React from "react";

import CreateOrder from "@/components/create-order/CreateOrder";
import { getAllItems } from "@/database/actions/item.action";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const email = ((await searchParams)?.email as string) || "";

  const { error, result } = await getAllCustomers(email, !email);
  const { error: itemsErr, result: items } = await getAllItems();
  return (
    <div className=" rounded-md  mt-5 h-full min-h-[70vh] flex flex-col gap-5 justify-start items-start ">
      <CreateOrder error={error} result={result!} items={items! || []} />
    </div>
  );
}
