-- CreateTable
CREATE TABLE "User" (
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" CHAR(1) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("name")
);
