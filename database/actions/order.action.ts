"use server";
import { Order, Prisma } from "@prisma/client";
import { executeQuery, prisma } from "..";

export async function createNewOrder() {
  const result = await executeQuery<Order>(
    prisma.order.create({
      data: {
        totalAmount: 0,
        pickupTime: new Date(),
        customerId: "19c41049-3d9d-49b3-9f4c-81f271735819",
        createdBy: "",
      },
    })
  );
  console.log("New order created", result);
  return result;
}
