/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `DefaultList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DefaultList" DROP CONSTRAINT "DefaultList_personId_fkey";

-- DropForeignKey
ALTER TABLE "DefaultList" DROP CONSTRAINT "DefaultList_roleId_fkey";

-- DropForeignKey
ALTER TABLE "DefaultList" DROP CONSTRAINT "DefaultList_userId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_projectId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "DefaultList";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Role";
