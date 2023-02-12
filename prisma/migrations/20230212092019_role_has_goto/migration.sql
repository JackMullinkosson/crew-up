/*
  Warnings:

  - You are about to drop the `_GoTosToRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `goToId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GoTosToRole" DROP CONSTRAINT "_GoTosToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_GoTosToRole" DROP CONSTRAINT "_GoTosToRole_B_fkey";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "goToId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_GoTosToRole";

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_goToId_fkey" FOREIGN KEY ("goToId") REFERENCES "GoTos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
