"use server";
import { Order } from "@prisma/client";
import { executeQuery, prisma } from "..";

export async function createNewOrder() {
  const result = await executeQuery<Order>(
    await prisma.order.create({
      data: {
        user: {
          connect: {
            clerkId: "user_305SWg6R95Bd7ZTFNOdTmhBqozG",
          },
        },
        customer: {
          connect: {
            id: "6bfed2cd-7962-498b-8458-ca1e24231e40",
          },
        },
        pickupTime: new Date(),
      },
    })
  );
  console.log("New order created", result);
  return result;
}
