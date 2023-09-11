/*
  Warnings:

  - You are about to drop the column `nickname` on the `note` table. All the data in the column will be lost.
  - Added the required column `userNickname` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_nickname_fkey";

-- AlterTable
ALTER TABLE "note" DROP COLUMN "nickname",
ADD COLUMN     "userNickname" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userNickname_fkey" FOREIGN KEY ("userNickname") REFERENCES "user"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
