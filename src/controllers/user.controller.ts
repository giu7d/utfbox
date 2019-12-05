import { User, IUser } from "../models/user.model";
import { hashPassword, getInitials } from "../utils";
import { createRootDirectory } from "./directory.controller";

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

    await userSchema.validate();
    await userSchema.save();

    await createRootDirectory(userSchema.id);

    return userSchema.id;
  } catch (err) {
    console.error(err);
  }
}

async function updateUser(userId: string, updatedObject: Object) {
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedObject },
      {
        runValidators: true
      }
    );
  } catch (err) {
    console.error(err);
  }
}

export { getAllUsers, getUserById, createUser, updateUser };
