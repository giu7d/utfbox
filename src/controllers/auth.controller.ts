import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { comparePassword } from "../utils";

async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email });

  if (user === null) {
    throw new Error("User doesn't exist");
  }

  if (comparePassword(email, password, user.password)) {
    return {
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string)
    };
  } else {
    throw new Error("Password and/or Email is wrong");
  }
}

export { authenticateUser };
