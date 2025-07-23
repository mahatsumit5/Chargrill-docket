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
        cartItems: {
          create: [
            {
              itemId: "1f6c6623-cb04-4e69-998a-4851aa799bcb",
              sizeId: "880f389f-408a-4988-a34c-493fdc966884",
              quantity: 10,
            },
          ],
        },
      },
    })
  );
  console.log("New order created", result);
  return result;
}
