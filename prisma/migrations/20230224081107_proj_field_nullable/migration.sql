-- DropForeignKey
ALTER TABLE "GoTos" DROP CONSTRAINT "GoTos_projectId_fkey";

-- AlterTable
ALTER TABLE "GoTos" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GoTos" ADD CONSTRAINT "GoTos_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
