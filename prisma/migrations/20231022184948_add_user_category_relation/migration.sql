/*
  Warnings:

  - Added the required column `userNickname` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "userNickname" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userNickname_fkey" FOREIGN KEY ("userNickname") REFERENCES "user"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
