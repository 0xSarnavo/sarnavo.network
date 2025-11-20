/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Log` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "readTime" INTEGER,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "tags" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "images" TEXT,
ADD COLUMN     "metrics" TEXT,
ADD COLUMN     "techStack" TEXT;

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Log_slug_key" ON "Log"("slug");
