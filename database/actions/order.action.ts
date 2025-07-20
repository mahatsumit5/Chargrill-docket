"use server";
import { Order, OrderStatus, PaymentStatus } from "@prisma/client";
import { executeQuery, prisma } from "..";
type CreateNewOrderParams = {
  createdBy: string;
  customerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  pickupTime: Date;
  totalAmount: number;
  cartItems: string[];
};
export async function createNewOrder({
  createdBy,
  customerId,
  paymentStatus,
  pickupTime,
  status,
  totalAmount,
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
      },
    })
  );
  console.log("New order created", result);
  return result;
}
