/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "createdAt",
DROP COLUMN "dueDate",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "notification" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "taskDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "company";

-- CreateTable
CREATE TABLE "Collaborators" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTask" (
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("userId","taskId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collaborators_email_key" ON "Collaborators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Collaborators_phone_key" ON "Collaborators"("phone");

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
