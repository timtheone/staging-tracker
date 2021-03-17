/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Server`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Server.name_unique" ON "Server"("name");
