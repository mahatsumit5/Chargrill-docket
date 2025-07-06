/*
  Warnings:

  - You are about to drop the `_CategoryItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryItems" DROP CONSTRAINT "_CategoryItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryItems" DROP CONSTRAINT "_CategoryItems_B_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CategoryItems";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
