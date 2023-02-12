/*
  Warnings:

  - Added the required column `name` to the `GoTos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoTos" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "person_order_seq";
