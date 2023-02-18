/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE person_order_seq;
ALTER TABLE "Person" ALTER COLUMN "order" SET DEFAULT nextval('person_order_seq');
ALTER SEQUENCE person_order_seq OWNED BY "Person"."order";

-- CreateIndex
CREATE UNIQUE INDEX "Person_order_key" ON "Person"("order");
