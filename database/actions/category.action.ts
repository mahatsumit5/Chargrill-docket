"use server";
import { CreateCategoryParams } from "@/types";
import { executeQuery, prisma } from "..";
import { Category } from "@prisma/client";

export async function createCategory(data: CreateCategoryParams) {
  return await prisma.category.create({ data });
}
export async function getAllCategories() {
  return await executeQuery<Category[]>(await prisma.category.findMany());
}
