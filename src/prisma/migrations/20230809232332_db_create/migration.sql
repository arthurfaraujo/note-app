-- CreateTable
CREATE TABLE "user" (
    "userNickname" TEXT NOT NULL,
    "userEmail" TEXT,
    "userPassword" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userNickname")
);

-- CreateTable
CREATE TABLE "note" (
    "noteId" INTEGER NOT NULL,
    "noteContent" TEXT NOT NULL,
    "noteType" INTEGER NOT NULL,
    "userNickname" TEXT NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("noteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userEmail_key" ON "user"("userEmail");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userNickname_fkey" FOREIGN KEY ("userNickname") REFERENCES "user"("userNickname") ON DELETE RESTRICT ON UPDATE CASCADE;
