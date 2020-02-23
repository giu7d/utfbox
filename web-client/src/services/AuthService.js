import Axios from "axios";
import User from "../models/User";
import jwt from "jwt-decode";

const HTTP_SERVER_URL = "http://localhost:4000";

async function createUser(form) {
  const user = new User();
  user.adaptFromForm(form);

  const request = user.adaptToNetwork();
  const { status } = await Axios.post(`${HTTP_SERVER_URL}/user`, request);

  if (status !== 200) {
    console.error(status);
    throw new Error(status);
  }
}

async function authenticateUser(email, password) {
  const request = {
    email,
    password
  };

  const { data, status } = await Axios.post(`${HTTP_SERVER_URL}/auth`, request);
  const { token } = data;
  const { userId } = jwt(token);

  if (status !== 200) {
    console.error(status);
    throw new Error(status);
  }

  return { userId, token };
}

async function getUser(id, token) {
  const { data } = await Axios.get(`${HTTP_SERVER_URL}/user/${id}`, {
    headers: {
      Authorization: token
    }
  });
  const user = new User();
  user.adaptFromNetwork(data);

  return user;
}

export { createUser, authenticateUser, getUser };
