/*
  Warnings:

  - You are about to drop the column `stockId` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_stockId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stockId";
