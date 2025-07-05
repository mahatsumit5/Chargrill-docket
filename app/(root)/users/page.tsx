import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreateCustomerParams as Customer } from "@/types";
import { getAllCustomers } from "@/database/actions/customer.action";
import { executeQuery } from "@/database";
const page = async () => {
  const pageNum = 1;

  const { data, error, status, message } = await executeQuery<
    Customer[],
    number
  >(getAllCustomers(pageNum), {});
  console.log("this is a data", data?.length);
  console.log();
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(({ firstName, lastName, email, phone, country }) => (
            <TableRow>
              <TableCell className="font-medium">
                {firstName}
                {lastName}
              </TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell className="text-right">{country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
