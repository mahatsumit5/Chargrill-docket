/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('DRAFT', 'PENDING', 'CONFIRMED', 'READY', 'DISPATCHED', 'DELIVERED', 'AWAITING_PICKUP', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('AWAITING_PAYMENT', 'REFUNDED', 'DECLINED', 'PAYMENT_COMPLETED');

-- DropForeignKey
ALTER TABLE "ItemSize" DROP CONSTRAINT "ItemSize_itemId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'AWAITING_PAYMENT',
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'DRAFT';

-- AddForeignKey
ALTER TABLE "ItemSize" ADD CONSTRAINT "ItemSize_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
