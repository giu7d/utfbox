import { User, IUser } from "../models/user.model";
import { hashPassword, getInitials } from "../utils";

async function getAllUsers() {
  const users = await User.find()
    .select({
      password: 0,
      __v: 0
    })
    .exec();

  return users;
}

async function getUserById(id: string) {
  const user = await User.findById(id)
    .select({
      password: 0,
      __v: 0
    })
    .exec();
  return user;
}

async function createUser(user: IUser) {
  const { firstName, lastName, username, password } = user;

  const userInterface = {
    ...user,
    initials: getInitials(firstName, lastName),
    password: hashPassword(username, password)
  };

  try {
    const userSchema = new User(userInterface);
    userSchema.save();
    return userSchema.id;
  } catch (err) {
    console.log(err);
  }
}

export { getAllUsers, getUserById, createUser };
