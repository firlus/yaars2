import express from "express";
import { PrismaClient } from "@prisma/client";

const lecturesController = express.Router();
const prisma = new PrismaClient();

// (C)reate
lecturesController.post("/", (req, res) => {
  prisma.user
    .update({
      where: {
        name: req.auth.name,
      },
      include: {
        lectures: true,
      },
      data: {
        lectures: {
          create: [
            {
              name: req.body.name,
            },
          ],
        },
      },
    })
    .then((user) =>
      res.status(200).send(user.lectures[user.lectures.length - 1])
    );
});

// (R)ead many
lecturesController.get("/", (req, res) => {
  // TODO Implement JSON Web Server filter and sorting
  prisma.user
    .findUnique({ where: { name: req.auth.name }, include: { lectures: true } })
    .then((user) =>
      res
        .set("X-Total-Count", user.lectures.length)
        .set("Access-Control-Expose-Headers", "X-Total-Count")
        .send(user.lectures)
    );
});

// (R)ead one
lecturesController.get("/:lectureId", (req, res) => {
  prisma.lecture
    .findUnique({ where: { id: parseInt(req.params.lectureId) } })
    .then((lecture) => res.status(200).send(lecture));
});

// (U)pdate
lecturesController.put("/:lectureId", (req, res) => {
  prisma.lecture
    .update({
      where: { id: parseInt(req.params.lectureId) },
      data: { name: req.body.name },
    })
    .then((lecture) => res.status(200).send(lecture));
});

// (D)elete
lecturesController.delete("/:lectureId", (req, res) => {
  prisma.lecture
    .findUnique({ where: { id: parseInt(req.params.lectureId) } })
    .then((lecture) => {
      prisma.lecture
        .delete({ where: { id: parseInt(req.params.lectureId) } })
        .then((_) => res.status(200).send(lecture));
    });
});

export default lecturesController;
