import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { comparePassword } from "../utils";

async function authenticateUser(username: string, password: string) {
  const user = await User.findOne({
    username: username
  });

  if (user === null) {
    throw new Error("User doesn't exist");
  }

  if (comparePassword(username, password, user.password)) {
    return {
      token: jwt.sign({ user }, process.env.JWT_SECRET as string)
    };
  } else {
    throw new Error("Password and/or Username is wrong");
  }
}

export { authenticateUser };
