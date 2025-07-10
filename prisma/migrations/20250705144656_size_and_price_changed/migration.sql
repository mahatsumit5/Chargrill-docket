/*
  Warnings:

  - You are about to drop the column `size` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SizeEnum" AS ENUM ('REGULAR', 'LARGE', 'FAMILY', 'EXTRA_LARGE', 'SMALL', 'MEDIUM');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_orderId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "size";

-- DropTable
DROP TABLE "Cart";

-- DropEnum
DROP TYPE "Size";

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quanity" INTEGER NOT NULL DEFAULT 1,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "name" "SizeEnum" NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ItemSize" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "sizeId" "SizeEnum" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemSize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ItemSize_itemId_sizeId_key" ON "ItemSize"("itemId", "sizeId");

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSize" ADD CONSTRAINT "ItemSize_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSize" ADD CONSTRAINT "ItemSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
