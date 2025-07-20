/*
  Warnings:

  - Added the required column `sizeId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "sizeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "ItemSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
