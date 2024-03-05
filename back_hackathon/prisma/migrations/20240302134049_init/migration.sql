-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CANDIDATE', 'ADMIN', 'RECRUITER');

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "SkillTree" (
    "treeID" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "SkillTree_pkey" PRIMARY KEY ("treeID")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskID" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "niveauDifficulte" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskID")
);

-- CreateTable
CREATE TABLE "TreeTask" (
    "treeID" INTEGER NOT NULL,
    "taskID" INTEGER NOT NULL,
    "statusTask" TEXT,

    CONSTRAINT "TreeTask_pkey" PRIMARY KEY ("treeID","taskID")
);

-- CreateTable
CREATE TABLE "UserTask" (
    "userID" INTEGER NOT NULL,
    "taskID" INTEGER NOT NULL,
    "completionDate" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("userID","taskID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SkillTree" ADD CONSTRAINT "SkillTree_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeTask" ADD CONSTRAINT "TreeTask_treeID_fkey" FOREIGN KEY ("treeID") REFERENCES "SkillTree"("treeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeTask" ADD CONSTRAINT "TreeTask_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task"("taskID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task"("taskID") ON DELETE RESTRICT ON UPDATE CASCADE;
