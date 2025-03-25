/*
  Warnings:

  - You are about to drop the column `Amount` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `Rate` on the `Item` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "Amount",
DROP COLUMN "Rate",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "rate" DECIMAL(65,30) NOT NULL;
