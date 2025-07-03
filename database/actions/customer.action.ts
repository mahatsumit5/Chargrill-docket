"use server";

import { CreateCustomerParams, ServerReturnType } from "@/types";
import { prisma } from "..";

export async function createCustomer(data: CreateCustomerParams) {
  return await prisma.customer.create({
    data,
  });
}
