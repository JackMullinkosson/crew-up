/*
  Warnings:

  - You are about to drop the `DefaultList` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DefaultList" DROP CONSTRAINT "DefaultList_personId_fkey";

-- DropForeignKey
ALTER TABLE "DefaultList" DROP CONSTRAINT "DefaultList_roleId_fkey";

-- DropForeignKey
ALTER TABLE "DefaultList" DROP CONSTRAINT "DefaultList_userId_fkey";

-- AlterTable
CREATE SEQUENCE person_order_seq;
ALTER TABLE "Person" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "order" SET DEFAULT nextval('person_order_seq');
ALTER SEQUENCE person_order_seq OWNED BY "Person"."order";

-- DropTable
DROP TABLE "DefaultList";

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
