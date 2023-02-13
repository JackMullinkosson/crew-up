/*
  Warnings:

  - You are about to drop the column `roleName` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `roleName` on the `ProjectRole` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `ProjectRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_roleName_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRole" DROP CONSTRAINT "ProjectRole_roleName_fkey";

-- DropIndex
DROP INDEX "Role_name_key";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "roleName",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProjectRole" DROP COLUMN "roleName",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD CONSTRAINT "ProjectRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
