import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function executeQuery(query: any) {
  try {
    return await query;
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
