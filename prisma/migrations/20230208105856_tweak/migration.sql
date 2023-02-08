-- AlterTable
ALTER TABLE "Day" ALTER COLUMN "startTime" SET DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
ALTER COLUMN "endTime" SET DEFAULT '0001-01-01 00:00:00'::timestamp without time zone;
