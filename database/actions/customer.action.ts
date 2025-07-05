"use server";

import { CreateCustomerParams, ServerReturnType } from "@/types";
import { prisma } from "..";

export async function createCustomer(data: CreateCustomerParams) {
  return await prisma.customer.create({
    data,
  });
}
export async function getCustomerById(id: string) {
  return await prisma.customer.findFirst({
    where: {
      id,
    },
  });
}

export async function getAllCustomers(page: number) {
  return await prisma.customer.findMany();
}
