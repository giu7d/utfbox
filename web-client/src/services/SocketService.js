import socketIO from "socket.io-client";
import Directory from "../models/Directory";

const SOCKET_URL = "http://localhost:4000";

class SocketService {
  _token = null;
  _io = null;

  async connect() {
    this.io = socketIO(SOCKET_URL, {
      transports: ["polling"],
      transportOptions: {
        polling: {
          extraHeaders: { Authorization: this.token }
        }
      }
    });
  }

  async readDirectory(userId, directoryId) {
    const { directory, children } = await new Promise((success, error) => {
      this.io
        .emit("getDir", { userId, directoryId })
        .on("successGetDir", data => success(data))
        .on("error", data => error(data));
    });

    const directoryInstance = new Directory();
    directoryInstance.adaptFromSocket({ ...directory, children });

    return directoryInstance;
  }

  async createDirectory(userId, parentId, title) {
    try {
      const directory = new Directory();
      const request = directory.adaptToSocket({ title, userId, parentId });

      const response = await new Promise((success, error) => {
        this.io
          .emit("createDir", { userId, directory: request })
          .on("successCreateDir", data => success(data))
          .on("error", data => error(data));
      });

      return await this.readDirectory(userId, parentId);
    } catch (err) {
      console.log(err);
    }
  }

  // Getter e Setter

  get io() {
    return this._io;
  }
  set io(value) {
    this._io = value;
  }

  get token() {
    return this._token;
  }
  set token(value) {
    this._token = value;
  }
}

export default new SocketService();
