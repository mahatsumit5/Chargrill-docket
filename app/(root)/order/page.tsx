export const dynamic = "force-dynamic";
import { DataTable } from "@/components/reuseable/ReuseableTable";
import { getAllOrders } from "@/database/actions/order.action";
import React from "react";

async function Page() {
  const { error, result } = await getAllOrders();

  return !error ? (
    <div className="  flex flex-col items-center justify-center p-3">
      list of orders
      <DataTable type="order" data={result!} />
    </div>
  ) : (
    <div>Eror Occured</div>
  );
}

export default Page;
