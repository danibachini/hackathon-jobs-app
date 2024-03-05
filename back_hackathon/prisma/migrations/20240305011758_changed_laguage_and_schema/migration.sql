/*
  Warnings:

  - You are about to drop the column `niveauDifficulte` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `SkillTree` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreeTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `difficultyLevel` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SkillTree" DROP CONSTRAINT "SkillTree_id_fkey";

-- DropForeignKey
ALTER TABLE "TreeTask" DROP CONSTRAINT "TreeTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TreeTask" DROP CONSTRAINT "TreeTask_treeId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "niveauDifficulte",
ADD COLUMN     "difficultyLevel" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SkillTree";

-- DropTable
DROP TABLE "TreeTask";

-- CreateTable
CREATE TABLE "JobOffer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTask" (
    "jobOfferId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "JobTask_pkey" PRIMARY KEY ("jobOfferId","taskId")
);

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
