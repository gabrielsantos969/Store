/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_customerId_key" ON "Cart"("customerId");
