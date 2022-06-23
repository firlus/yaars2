import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const authController = express.Router();
const prisma = new PrismaClient();

authController.post("/login", (req, res) => {
  prisma.user.findUnique({ where: { name: req.body.name } }).then((user) =>
    bcrypt.compare(req.body.password, user.password).then((success) => {
      if (success) {
        const token = jwt.sign(
          { id: user.id, name: user.name, role: user.role },
          "privatekey"
        );
        res.status(200).send({ token });
      } else {
        res.send(403);
      }
    })
  );
});

authController.post("/verify", (req, res) => {
  try {
    const payload = jwt.verify(req.body.token, "privatekey");
    res.status(200).send(payload);
  } catch (err) {
    res.status(403).send();
  }
});

export default authController;
