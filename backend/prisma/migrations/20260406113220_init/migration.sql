/*
  Warnings:

  - You are about to drop the column `active_flag` on the `assignment_status_types` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `business_groups` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `business_types` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `grades` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `hr_organizations` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `job_postings` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `legal_entities` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `operating_units` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `persons` table. All the data in the column will be lost.
  - You are about to drop the column `active_flag` on the `positions` table. All the data in the column will be lost.
  - Made the column `address1` on table `locations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "assignment_status_types" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "business_groups" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "business_types" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "grades" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "hr_organizations" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "job_postings" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "legal_entities" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "address1" SET NOT NULL;

-- AlterTable
ALTER TABLE "operating_units" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "persons" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "positions" DROP COLUMN "active_flag",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
