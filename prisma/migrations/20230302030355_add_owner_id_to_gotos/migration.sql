/*
  Warnings:

  - Added the required column `ownerId` to the `GoTos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoTos" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GoTos" ADD CONSTRAINT "GoTos_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
