import { observable, action, runInAction } from "mobx";
import { notification as notify } from "antd";
import { createUser, authenticateUser, getUser } from "../services/AuthService";
import SocketService from "../services/SocketService";

class AppStore {
  @observable token = "";
  @observable user = null;
  @observable directory = { children: [] };
  @observable notification = {
    status: false,
    title: "",
    message: "",
    time: 5
  };

  constructor(socketService) {
    this.socketService = socketService;
  }

  @action
  async createNewAccount(form) {
    try {
      await createUser(form);
      runInAction(() => {
        this.setNotification("Maravilha!!", "Usuário criado com sucesso");
      });
    } catch (err) {
      this.setNotification("Opss :/", `${err}`);
    }
  }

  @action
  async authAccount(form) {
    try {
      const { email, password } = form;
      const { userId, token } = await authenticateUser(email, password);

      this.socketService.token = token;
      this.socketService.connect();

      runInAction(() => {
        this.token = token;
        this.getAccountInfo(userId);
      });
    } catch (err) {
      this.setNotification("Opss :/", `${err}`);
    }
  }

  @action
  async getAccountInfo(id) {
    try {
      const user = await getUser(id, this.token);

      runInAction(() => {
        this.user = user;
        this.getDirectory();
        this.setNotification("Sucesso!", "O login foi realizado com sucesso!");
      });
    } catch (err) {
      console.error(err);
      this.setNotification("Opss :/", `${err}`);
    }
  }

  @action
  async getDirectory() {
    try {
      const { id, rootDirectoryId } = this.user;
      const directory = await this.socketService.readDirectory(
        id,
        rootDirectoryId
      );

      runInAction(() => {
        this.directory = directory;
      });
    } catch (err) {
      console.error(err);
      this.setNotification("Opss :/", `${err}`);
    }
  }

  @action
  async createDirectory(form) {
    try {
      const directory = await this.socketService.createDirectory(
        this.user.id,
        this.directory.id,
        form.fileName
      );

      runInAction(() => {
        this.directory = directory;
        this.setNotification("Maravilha!!", "Nova pasta criada.");
      });
    } catch (err) {
      console.log(err);
    }
  }

  @action
  setNotification(title, message, time = 5) {
    this.notification = {
      status: true,
      title,
      message,
      time
    };

    runInAction(async () => {
      notify.open({
        message: this.notification.title,
        description: this.notification.message,
        duration: this.notification.time
      });

      setTimeout(() => {
        this.clearNotification();
      }, time * 1000);
    });
  }

  @action
  clearNotification() {
    this.notification = {
      status: false,
      title: "",
      message: "",
      time: 5
    };
  }

  isAuthenticated() {
    return this.token !== "" && this.user !== null;
  }
}

export default new AppStore(SocketService);
