"use server";

import { CreateItemParams } from "@/types";
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
  try {
    const items = await prisma.item.findMany({
      include: {
        category: true,
      },
    });

    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
}
