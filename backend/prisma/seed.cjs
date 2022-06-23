const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const bcrypt = require("bcrypt");

console.log(process.env.DATABASE_URL);

const prisma = new PrismaClient();

bcrypt
  .hash(process.env.INITIAL_PASSWORD, 10)
  .then((hash) =>
    prisma.user.create({
      data: {
    name: process.env.INITIAL_USERNAME,
        password: hash,
        role: "A",
        lectures: {
          create: [{ name: "oof yikes" }],
        },
      },
    })
  )
  .then((_) => console.log("Initial user created successfully"))
  .catch(console.error);

prisma.user.findMany({ include: { lectures: true } }).then(console.log);
