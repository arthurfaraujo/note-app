-- CreateTable
CREATE TABLE "user" (
    "nickname" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "type" INTEGER,
    "userNickname" TEXT NOT NULL,
    CONSTRAINT "note_userNickname_fkey" FOREIGN KEY ("userNickname") REFERENCES "user" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
