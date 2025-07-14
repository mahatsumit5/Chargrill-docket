import { DataTable } from "@/components/reuseable/ReuseableTable";
import { getAllItems } from "@/database/actions/item.action";
import { Item } from "@prisma/client";
import React from "react";

const page = async ({}: {}) => {
  const { error, result } = await getAllItems();
  console.log(result);
  return !error ? (
    <div className="">
      <DataTable data={result as Item[]} type="items" />
    </div>
  ) : (
    "error"
  );
};

export default page;
