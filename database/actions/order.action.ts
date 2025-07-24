"use server";
import { Order, OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import { executeQuery, prisma } from "..";
type CreateNewOrderParams = {
  createdBy: string;
  customerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  pickupTime: Date;
  totalAmount: number;
  cartItems: { itemId: string; sizeId: string; quantity: number }[];
};
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
