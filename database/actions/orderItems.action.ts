"use server";

import { CreateNewOrderParams } from "@/types";
import { executeQuery, prisma } from "..";

export async function CreateNewOrderItems(args: CreateNewOrderParams[]) {
  const { error, result } = await executeQuery(
    prisma.orderItems.createMany({
      data: args,
      skipDuplicates: true,
    })
  );

  return { error, result };
}
