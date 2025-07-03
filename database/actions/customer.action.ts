"use server";

import { CreateCustomerParams } from "@/types";
import { prisma } from "..";

export async function createCustomer(data: CreateCustomerParams) {
  try {
    const newCustomer = await prisma.customer.create({
      data,
    });
    if (!newCustomer.id) {
      throw new Error("Customer creation failed");
    }
    return JSON.parse(JSON.stringify(newCustomer));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create customer");
  }
}
