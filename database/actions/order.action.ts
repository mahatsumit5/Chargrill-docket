"use server";
import { Order } from "@prisma/client";
import { executeQuery, prisma } from "..";
import { CreateNewOrderParams } from "@/types";

export async function createNewOrder({
  createdBy,
  customerId,
  paymentStatus,
  pickupTime,
  status,
  totalAmount,
  cartItems,
}: CreateNewOrderParams) {
  const result = await executeQuery<Order>(
    await prisma.order.create({
      data: {
        user: {
          connect: {
            clerkId: createdBy,
          },
        },
        customer: {
          connect: {
            id: customerId,
          },
        },
        pickupTime,
        paymentStatus,
        status,
        totalAmount,
        cartItems: {
          create: cartItems.map(({ itemId, sizeId, quantity }) => ({
            itemId,
            sizeId,
            quantity,
          })),
        },
      },
    })
  );
  console.log("New order created", result);
  return result;
}

export async function getAllOrders() {
  return await executeQuery<Order[]>(
    prisma.order.findMany({
      include: {
        customer: true,
        user: true,
        cartItems: true,
      },
    })
  );
}
