/*
  Warnings:

  - You are about to drop the `ProjectRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `GoTos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectRole" DROP CONSTRAINT "ProjectRole_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRole" DROP CONSTRAINT "ProjectRole_roleId_fkey";

-- AlterTable
ALTER TABLE "GoTos" ADD COLUMN     "defaultGoTo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProjectRole";

-- AddForeignKey
ALTER TABLE "GoTos" ADD CONSTRAINT "GoTos_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
