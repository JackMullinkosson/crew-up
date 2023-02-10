/*
  Warnings:

  - You are about to drop the column `goTosId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_goTosId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "goTosId";

-- CreateTable
CREATE TABLE "_GoTosToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GoTosToRole_AB_unique" ON "_GoTosToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_GoTosToRole_B_index" ON "_GoTosToRole"("B");

-- AddForeignKey
ALTER TABLE "_GoTosToRole" ADD CONSTRAINT "_GoTosToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "GoTos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoTosToRole" ADD CONSTRAINT "_GoTosToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
