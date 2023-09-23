/*
  Warnings:

  - The primary key for the `note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `noteContent` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `noteId` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `noteType` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `userNickname` on the `note` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userEmail` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userNickname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_userNickname_fkey";

-- DropIndex
DROP INDEX "user_userEmail_key";

-- AlterTable
ALTER TABLE "note" DROP CONSTRAINT "note_pkey",
DROP COLUMN "noteContent",
DROP COLUMN "noteId",
DROP COLUMN "noteType",
DROP COLUMN "userNickname",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL,
ADD CONSTRAINT "note_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "userEmail",
DROP COLUMN "userName",
DROP COLUMN "userNickname",
DROP COLUMN "userPassword",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_nickname_fkey" FOREIGN KEY ("nickname") REFERENCES "user"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
