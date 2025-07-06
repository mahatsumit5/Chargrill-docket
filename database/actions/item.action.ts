"use server";

import { executeQuery, prisma } from "..";
export async function createItem(data: any) {
  const { category, ...rest } = data;
  const result = executeQuery(
    await prisma.item.create({
      data: {
        category: {
          connect: {
            id: category,
          },
        },
        ...rest,
      },
    })
  );
  console.log(result);
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
