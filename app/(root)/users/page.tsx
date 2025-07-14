import React from "react";

import { getAllCustomers } from "@/database/actions/customer.action";

import { DataTable } from "@/components/reuseable/ReuseableTable";
const page = async () => {
  const pageNum = 1;

  const { error, result } = await getAllCustomers("");
  return (
    <div>
      <DataTable data={result ?? []} type="customer" />
    </div>
  );
};

export default page;
