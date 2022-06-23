import express from "express";
import { PrismaClient } from "@prisma/client";

const participateController = express.Router();
const prisma = new PrismaClient();

export default participateController;

participateController.get("/lecture/:lectureId", async (req, res) => {
  const lectureId = parseInt(req.params.lectureId);
  const openPoll = await prisma.poll.findFirst({
    where: {
      forLecture: {
        id: lectureId,
      },
      isRunning: true,
    },
    include: {
      answerOptions: true,
      participants: true,
    },
  });
  if (!openPoll) {
    res.status(200).send({});
    return;
  }
  const clientIds = openPoll.participants.map(
    (participant) => participant.clientId
  );
  console.log(clientIds);
  if (clientIds.includes(req.query.clientId)) {
    res.send({ info: "POLLED" });
    return;
  }
  res.send(openPoll);
});

participateController.post("/poll/:pollId", async (req, res) => {
  const pollId = parseInt(req.params.pollId);
  await prisma.poll.findFirst({
    where: {
      id: pollId,
      isRunning: true,
    },
  });
  if (!pollId) {
    console.log("no poll found");
    res.sendStatus(400);
    return;
  }

  const duplicates = await prisma.participant.findMany({
    where: {
      pollId: pollId,
      clientId: req.body.clientId,
    },
  });

  if (duplicates.length > 0) {
    console.log("dupe");
    res.sendStatus(400);
    return;
  }

  console.log(req.body);

  await prisma.answerOption.update({
    where: {
      id: req.body.answerOptionId,
    },
    data: {
      answers: {
        create: {
          clientId: req.body.clientId,
        },
      },
    },
  });

  await prisma.poll.update({
    where: {
      id: pollId,
    },
    data: {
      participants: {
        create: {
          clientId: req.body.clientId,
        },
      },
    },
  });

  res.sendStatus(200);
});

participateController.get("/poll/:pollId", async (req, res) => {
  // Only if not running
  const pollId = parseInt(req.params.pollId);
  const results = await prisma.poll.findUnique({
    where: {
      id: pollId,
    },
    select: {
      question: true,
      answerOptions: {
        select: {
          id: true,
          text: true,
          _count: {
            select: {
              answers: true,
            },
          },
        },
      },
    },
  });
  res.send(results);
});
