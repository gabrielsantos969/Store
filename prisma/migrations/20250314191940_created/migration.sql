/*
  Warnings:

  - A unique constraint covering the columns `[stockId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('LITRO', 'QUILOGRAMA', 'UNIDADE', 'METRO', 'PACOTE', 'PECA', 'BANDEJA', 'DUZIA', 'ROLO');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "stockId" TEXT;

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'UNIDADE',
    "unitQuantity" DECIMAL(65,30),
    "productId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_productId_key" ON "Stock"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_stockId_key" ON "Product"("stockId");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
