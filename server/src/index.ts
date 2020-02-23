import "dotenv/config";
import http from "http";
import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";
import socketIO, { Server } from "socket.io";
import connect from "./connect";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import socket from "./socket";
import cors from "cors";

const PORT = process.env.PORT;

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = socketIO(server, {
  origins: ["*:*"],
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});

connect();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/auth", authRouter);

socket(io);

server.listen(PORT, () => console.log(`SERVER is running on PORT ${PORT}`));
