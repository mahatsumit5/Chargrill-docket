"use server";

import { executeQuery, prisma } from "..";

export async function CreateNewOrderItems() {
  return await executeQuery(
    prisma.orderItems.createMany({
      skipDuplicates: true,
      data: [
        {
          sizeId: "f34cc7ff-9ff1-4ea6-a536-323c2b6e4aa1",
          itemId: "1f6c6623-cb04-4e69-998a-4851aa799bcb",
          orderId: "2d09357c-e4e0-4b83-8fcb-63414714c6f0",
          quanity: 1,
        },
      ],
    })
  );
}
