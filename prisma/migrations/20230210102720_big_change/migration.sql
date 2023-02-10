/*
  Warnings:

  - You are about to drop the column `role` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleName` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goTosId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_projectId_fkey";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "role",
ADD COLUMN     "roleName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "projectId",
ADD COLUMN     "goTosId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GoTos" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "GoTos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRole" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_goTosId_fkey" FOREIGN KEY ("goTosId") REFERENCES "GoTos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD CONSTRAINT "ProjectRole_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD CONSTRAINT "ProjectRole_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
