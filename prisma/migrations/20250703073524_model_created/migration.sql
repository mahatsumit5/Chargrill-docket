/*
  Warnings:

  - You are about to drop the column `locationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('CHICKEN', 'SALAD', 'SIDES', 'SHARING_BOXES', 'DESSERTS', 'DRINKS', 'SAUCES', 'FINGER_FOOD');

-- CreateEnum
CREATE TYPE "Dietary" AS ENUM ('VEGAN', 'VEGETARIAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'NUT_FREE');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('REGULAR', 'LARGE');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_locationId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "locationId";

-- DropTable
DROP TABLE "Location";

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "pickupTime" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "dietary" "Dietary"[],
    "size" TEXT[],

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" "Categories" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postCode" INTEGER NOT NULL,
    "country" TEXT DEFAULT 'Australia',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Order_createdBy_idx" ON "Order"("createdBy");

-- CreateIndex
CREATE INDEX "Item_id_idx" ON "Item"("id");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "_OrderItems_B_index" ON "_OrderItems"("B");

-- CreateIndex
CREATE INDEX "_CategoryItems_B_index" ON "_CategoryItems"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderItems" ADD CONSTRAINT "_OrderItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderItems" ADD CONSTRAINT "_OrderItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryItems" ADD CONSTRAINT "_CategoryItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryItems" ADD CONSTRAINT "_CategoryItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
