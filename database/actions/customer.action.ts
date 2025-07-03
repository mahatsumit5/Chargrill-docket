"use server";

import { CreateCustomerParams, ServerReturnType } from "@/types";
import { prisma } from "..";
import { databaseActionHandle } from ".";

export async function createCustomer(
  data: CreateCustomerParams
): ServerReturnType<CreateCustomerParams> {
  console.log("Creating customer with data:", data);
  const newCustomer = await prisma.customer.create({
    data,
  });
  console.log(newCustomer);
  if (!newCustomer.id) {
    throw new Error("Customer creation failed");
  }
  return {
    data: JSON.parse(JSON.stringify(newCustomer)),
    error: undefined,
  };
}
databaseActionHandle(() => {});
