import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Middlewares
import checkJwt from "./middleware/checkJwt.js";
import checkAdmin from "./middleware/checkAdmin.js";

// Controller
import usersController from "./controller/usersController.js";
import lecturesController from "./controller/lecturesController.js";
import authController from "./controller/authController.js";
import pollsController from "./controller/pollsController.js";
import presentController from "./controller/presentController.js";
import participateController from "./controller/participateController.js";

// Socket.io setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", () => {
  console.log("connected");
});
// Controller-independent middlewares
app.use(bodyParser.json());
app.use(cors());

// Authentification
app.use("/auth", authController);

// Lectures
app.use("/lectures", checkJwt);
app.use("/lectures", lecturesController);

// Polls
app.use("/polls", checkJwt);
app.use("/polls", pollsController);

// Users
app.use("/users", checkJwt);
app.use("/users", checkAdmin);
app.use("/users", usersController);

// Present Polls
app.use("/present", checkJwt);
app.use("/present", presentController);

// Participate in Polls
app.use("/participate", participateController);

server.listen(5000, () => {});
