/*
  Warnings:

  - Made the column `title` on table `Currency` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Currency" ALTER COLUMN "title" SET NOT NULL;
