/*
  Warnings:

  - You are about to drop the column `quanity` on the `OrderItems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "quanity",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
