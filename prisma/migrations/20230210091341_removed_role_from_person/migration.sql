/*
  Warnings:

  - You are about to drop the column `roleId` on the `Person` table. All the data in the column will be lost.
  - Added the required column `role` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_roleId_fkey";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "roleId",
ADD COLUMN     "role" TEXT NOT NULL;
