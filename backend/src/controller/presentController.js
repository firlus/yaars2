import express from "express";
import { PrismaClient } from "@prisma/client";

const presentController = express.Router();
const prisma = new PrismaClient();

// Start poll
presentController.post("/:pollId/start", async (req, res) => {
  const pollId = parseInt(req.params.pollId);
  // Assure lecture is created by authenticated user
  const poll = await prisma.poll.findUnique({
    where: {
      id: parseInt(pollId),
    },
    select: {
      forLecture: {
        select: {
          id: true,
          byUser: true,
        },
      },
    },
  });
  if (poll.forLecture.byUser.id !== req.auth.id) {
    res.sendStatus(403);
    return;
  }
  // Assure no other poll is running in same lecture
  const activePolls = await prisma.poll.findMany({
    where: {
      forLecture: {
        id: poll.forLecture.id,
      },
      isRunning: true,
    },
  });
  if (activePolls.length > 0) {
    res.sendStatus(400);
    return;
  }
  // Mark poll as running poll
  try {
    await prisma.poll.update({
      where: {
        id: pollId,
      },
      data: {
        isRunning: true,
      },
    });
    // Notify clients
    req.io.emit(poll.forLecture.id, { event: "start" });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Stop poll
presentController.post("/:pollId/stop", async (req, res) => {
  const pollId = parseInt(req.params.pollId);
  const poll = await prisma.poll.findUnique({
    where: {
      id: parseInt(pollId),
    },
    select: {
      isRunning: true,
      forLecture: {
        select: {
          id: true,
          byUser: true,
        },
      },
    },
  });
  // Assure lecture is created by authenticated user
  if (poll.forLecture.byUser.id !== req.auth.id) {
    res.sendStatus(403);
    return;
  }
  // Assure poll is running
  if (!poll.isRunning) {
    res.sendStatus(400);
    return;
  }
  // Mark poll as running poll
  try {
    await prisma.poll.update({
      where: {
        id: pollId,
      },
      data: {
        isRunning: false,
      },
    });
    console.log(poll.forLecture.id);
    req.io.emit(poll.forLecture.id, { event: "stop" });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default presentController;
