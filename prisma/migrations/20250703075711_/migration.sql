/*
  Warnings:

  - The `size` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_OrderItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Size" ADD VALUE 'FAMILY';
ALTER TYPE "Size" ADD VALUE 'EXTRA_LARGE';
ALTER TYPE "Size" ADD VALUE 'SMALL';
ALTER TYPE "Size" ADD VALUE 'MEDIUM';

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "_OrderItems" DROP CONSTRAINT "_OrderItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderItems" DROP CONSTRAINT "_OrderItems_B_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "size",
ADD COLUMN     "size" "Size"[];

-- DropTable
DROP TABLE "_OrderItems";

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quanity" INTEGER NOT NULL DEFAULT 1,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
