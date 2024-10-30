-- CreateTable
CREATE TABLE "User" (
    "clerkId" TEXT NOT NULL,
    "userName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "photo" TEXT NOT NULL DEFAULT '',
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("clerkId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
