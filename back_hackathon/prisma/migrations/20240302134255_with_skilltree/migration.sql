/*
  Warnings:

  - The primary key for the `SkillTree` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `treeID` on the `SkillTree` table. All the data in the column will be lost.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `taskID` on the `Task` table. All the data in the column will be lost.
  - The primary key for the `TreeTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `taskID` on the `TreeTask` table. All the data in the column will be lost.
  - You are about to drop the column `treeID` on the `TreeTask` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userID` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `taskID` on the `UserTask` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `UserTask` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `TreeTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treeId` to the `TreeTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `UserTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SkillTree" DROP CONSTRAINT "SkillTree_userID_fkey";

-- DropForeignKey
ALTER TABLE "TreeTask" DROP CONSTRAINT "TreeTask_taskID_fkey";

-- DropForeignKey
ALTER TABLE "TreeTask" DROP CONSTRAINT "TreeTask_treeID_fkey";

-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_taskID_fkey";

-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_userID_fkey";

-- AlterTable
ALTER TABLE "SkillTree" DROP CONSTRAINT "SkillTree_pkey",
DROP COLUMN "treeID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SkillTree_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
DROP COLUMN "taskID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TreeTask" DROP CONSTRAINT "TreeTask_pkey",
DROP COLUMN "taskID",
DROP COLUMN "treeID",
ADD COLUMN     "taskId" INTEGER NOT NULL,
ADD COLUMN     "treeId" INTEGER NOT NULL,
ADD CONSTRAINT "TreeTask_pkey" PRIMARY KEY ("treeId", "taskId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_pkey",
DROP COLUMN "taskID",
DROP COLUMN "userID",
ADD COLUMN     "taskId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "UserTask_pkey" PRIMARY KEY ("userId", "taskId");

-- AddForeignKey
ALTER TABLE "SkillTree" ADD CONSTRAINT "SkillTree_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeTask" ADD CONSTRAINT "TreeTask_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "SkillTree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeTask" ADD CONSTRAINT "TreeTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
