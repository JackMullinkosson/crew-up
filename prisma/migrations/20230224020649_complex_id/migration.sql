/*
  Warnings:

  - A unique constraint covering the columns `[id,goToId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_id_goToId_key" ON "Role"("id", "goToId");
