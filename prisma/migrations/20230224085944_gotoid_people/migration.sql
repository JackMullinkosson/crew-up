/*
  Warnings:

  - Added the required column `goToId` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "goToId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_goToId_fkey" FOREIGN KEY ("goToId") REFERENCES "GoTos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
