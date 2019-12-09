import { Server, Socket } from "socket.io";
import { authenticateSocket } from "./controllers";
import {
  createDirectory,
  CreateDirectoryInput,
  GetDirectoryByIdInput,
  getDirectoryById,
  getAllDirectories,
  GetAllDirectoriesType,
  DeleteDirectoryType,
  deleteDirectory,
  ShareDirectoryType,
  shareDirectory
} from "./controllers/directory.controller";

export default function socket(io: Server): void {
  io.use(authenticateSocket);

  io.on("connection", (socket: Socket) => {
    socket.on("createDir", async (data: CreateDirectoryInput) => {
      const directoryId = await createDirectory(data.userId, data.directory);
      socket.emit("successCreateDir", { directoryId });
    });

    socket.on("getDir", async (data: GetDirectoryByIdInput) => {
      const directory = await getDirectoryById(data.userId, data.directoryId);
      console.log(directory);
      socket.emit("successGetDir", directory);
    });

    socket.on("getAllDir", async (data: GetAllDirectoriesType) => {
      const directory = await getAllDirectories(data.userId);
      socket.emit("success", { directory });
    });

    socket.on("deleteDir", async (data: DeleteDirectoryType) => {
      const directory = await deleteDirectory(data.userId, data.directoryId);
      socket.emit("success", { directory });
    });

    socket.on("shareDir", async (data: ShareDirectoryType) => {
      const directory = await shareDirectory(
        data.userId,
        data.directoryId,
        data.sharedUserId
      );
      socket.emit("success", { directory });
    });
  });
}
