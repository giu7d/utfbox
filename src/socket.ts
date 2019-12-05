import { Server, Socket } from "socket.io";
import { authenticateSocket } from "./controllers";
import {
  createDirectory,
  CreateDirectoryInput,
  GetDirectoryByIdInput,
  getDirectoryById
} from "./controllers/directory.controller";

export default function socket(io: Server): void {
  io.use(authenticateSocket);

  io.on("connection", (socket: Socket) => {
    socket.on("createDir", async (data: CreateDirectoryInput) => {
      const directoryId = await createDirectory(data.userId, data.directory);
      socket.emit("success", { directoryId });
    });

    socket.on("getDir", async (data: GetDirectoryByIdInput) => {
      const directory = await getDirectoryById(data.userId, data.directoryId);
      socket.emit("success", { directory });
    });
  });
}
