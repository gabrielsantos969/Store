/*
  Warnings:

  - The values [LITRO,QUILOGRAMA,UNIDADE,METRO,PACOTE,PECA,BANDEJA,DUZIA,ROLO] on the enum `Unit` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Format" AS ENUM ('BOX', 'ROLL', 'ENVELOPE');

-- AlterEnum
BEGIN;
CREATE TYPE "Unit_new" AS ENUM ('LITER', 'KILOGRAM', 'UNIT', 'METER', 'PACKAGE', 'PIECE', 'TRAY', 'DOZEN', 'ROLL', 'BOX', 'ENVELOPE');
ALTER TABLE "Stock" ALTER COLUMN "unit" DROP DEFAULT;
ALTER TABLE "Stock" ALTER COLUMN "unit" TYPE "Unit_new" USING ("unit"::text::"Unit_new");
ALTER TYPE "Unit" RENAME TO "Unit_old";
ALTER TYPE "Unit_new" RENAME TO "Unit";
DROP TYPE "Unit_old";
ALTER TABLE "Stock" ALTER COLUMN "unit" SET DEFAULT 'UNIT';
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "diameter" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "format" "Format" NOT NULL DEFAULT 'BOX',
ADD COLUMN     "height" DECIMAL(10,2) NOT NULL DEFAULT 2,
ADD COLUMN     "length" DECIMAL(10,2) NOT NULL DEFAULT 16,
ADD COLUMN     "weight" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "width" DECIMAL(10,2) NOT NULL DEFAULT 11;

-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "unit" SET DEFAULT 'UNIT';
