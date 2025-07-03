"use server";

import { CreateItemParams } from "@/types";
import { prisma } from "..";
import { databaseActionHandle } from ".";
export async function createItem(data: CreateItemParams) {
  try {
    const newItem = await prisma.item.create({
      data,
    });

    if (!newItem.id) {
      throw new Error("Item creation failed");
    }
    return JSON.parse(JSON.stringify(newItem));
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Failed to create item");
  }
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
