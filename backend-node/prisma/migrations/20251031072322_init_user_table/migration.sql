-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
