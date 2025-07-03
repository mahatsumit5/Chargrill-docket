"user server";
import { CreateCategoryParams } from "@/types";
import { prisma } from "..";

export async function createCategory(data: CreateCategoryParams) {
  try {
    const newCategory = await prisma.category.create({
      data,
    });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
}
export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        items: true,
      },
    });

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
