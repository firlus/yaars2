import express from "express";
import { PrismaClient } from "@prisma/client";

const pollsController = express.Router();
const prisma = new PrismaClient();

// (C)reate
pollsController.post("/", (req, res) => {
  prisma.user
    .update({
      where: {
        name: req.auth.name,
      },
      select: {
        lectures: {
          select: {
            id: true,
            polls: {
              select: {
                id: true,
                question: true,
                type: true,
                lectureId: true,
                answerOptions: true,
              },
            },
          },
        },
      },
      data: {
        lectures: {
          update: {
            where: {
              id: req.body.lectureId,
            },
            data: {
              polls: {
                create: [
                  {
                    question: req.body.question,
                    type: "C",
                    answerOptions: {
                      create: req.body.answerOptions,
                    },
                  },
                ],
              },
            },
          },
        },
      },
    })
    .then((user) => {
      const poll = user.lectures
        .find((lecture) => lecture.id === req.body.lectureId)
        .polls.reduce((a, b) => (a.id > b.id ? a : b));

      res.status(200).send(poll);
    });
});

// (R)ead many
pollsController.get("/", (req, res) => {
  // TODO Implement JSON Web Server filter and sorting
  prisma.user
    .findUnique({
      where: { name: req.auth.name },
      select: {
        lectures: {
          select: {
            id: true,
            polls: {
              select: {
                id: true,
                question: true,
                type: true,
                lectureId: true,
                answerOptions: true,
              },
            },
          },
        },
      },
    })
    .then((user) => {
      const polls = user.lectures.flatMap((lecture) => lecture.polls);
      res
        .set("X-Total-Count", polls.length)
        .set("Access-Control-Expose-Headers", "X-Total-Count")
        .send(polls);
    });
});

// R(ead) one
pollsController.get("/:pollId", (req, res) => {
  prisma.poll
    .findUnique({
      where: {
        id: parseInt(req.params.pollId),
      },
      select: {
        id: true,
        question: true,
        type: true,
        lectureId: true,
        answerOptions: true,
        forLecture: {
          select: {
            byUser: true,
          },
        },
      },
    })
    .then((poll) => {
      if (poll.forLecture.byUser.id === req.auth.id) {
        res.status(200).send({ ...poll, forLecture: undefined });
      } else {
        res.sendStatus(404);
      }
    });
});

pollsController.delete("/:pollId", (req, res) => {
  prisma.poll
    .delete({ where: { id: parseInt(req.params.pollId) } })
    .then((poll) => res.status(200).send(poll));
});

export default pollsController;
