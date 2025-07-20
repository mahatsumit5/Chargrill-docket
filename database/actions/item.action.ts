"use server";

import { CreateItemParams, GetAllItemsResponse } from "@/types";
import { executeQuery, prisma } from "..";
import { Item } from "@prisma/client";

export async function createItem(data: CreateItemParams) {
  const { name, description, dietary, images, categoryId, sizeAndPrice } = data;

  const result = await executeQuery<Item>(
    await prisma.item.create({
      data: {
        name,
        description,
        images,
        dietary,
        category: {
          connect: {
            id: categoryId,
          },
        },
        sizes: {
          create: sizeAndPrice.map(({ price, size }) => ({
            price,
            size: {
              connectOrCreate: {
                create: {
                  name: size,
                },
                where: {
                  name: size,
                },
              },
            },
          })),
        },
      },
    })
  );
  console.log("New Item created", result);
  return result;
}

export async function getAllItems() {
  return await executeQuery<GetAllItemsResponse[]>(
    prisma.item.findMany({
      include: {
        category: true,
        sizes: true,
      },
    })
  );
}
