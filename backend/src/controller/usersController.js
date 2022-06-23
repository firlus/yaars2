import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const usersController = express.Router();
const prisma = new PrismaClient();

// (C)reate
usersController.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) =>
    prisma.user
      .create({
        data: {
          name: req.body.name,
          password: hash,
          role: "U",
        },
      })
      .then((user) => res.status(200).send(user))
      .catch((err) => res.status(400).send(err))
  );
});

// (R)ead many
// TODO Implement JSON web server sorting and filtering
usersController.get("/", (req, res) => {
  prisma.user.findMany().then((users) => {
    res
      .set("X-Total-Count", users.length)
      .set("Access-Control-Expose-Headers", "X-Total-Count")
      .send(users);
  });
});

// (R)ead one
usersController.get("/:userId", (req, res) => {
  prisma.user
    .findUnique({ where: { id: parseInt(req.params.userId) } })
    .then((user) => res.status(200).send(user));
});

// (U)pdate
// Won't exist for users (at least for now)

// (D)elete
usersController.delete("/:userId", (req, res) => {
  if (req.auth.id !== parseInt(req.params.userId)) {
    prisma.user
      .delete({ where: { id: parseInt(req.params.userId) } })
      .then((user) => res.status(200).send(user));
  } else {
    res.sendStatus(403);
  }
});

export default usersController;
