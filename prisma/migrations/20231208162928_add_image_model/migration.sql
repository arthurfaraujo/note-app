-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "userNickname" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_userNickname_key" ON "image"("userNickname");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_userNickname_fkey" FOREIGN KEY ("userNickname") REFERENCES "user"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
