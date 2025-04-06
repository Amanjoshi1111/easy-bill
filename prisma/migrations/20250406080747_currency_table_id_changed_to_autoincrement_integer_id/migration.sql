/*
  Warnings:

  - The `id` column on the `Currency` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currencyId` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_currencyId_fkey";

-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "currencyId",
ADD COLUMN     "currencyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Currency_id_key" ON "Currency"("id");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
