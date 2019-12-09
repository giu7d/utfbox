import mongoose, { Schema, Document } from "mongoose";

interface IUser {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  initials: string;
  rootDirectoryId: string;
}

interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  initials: { type: String, required: true },
  rootDirectoryId: { type: String }
});

const User = mongoose.model<IUserDocument>("User", UserSchema);

export { User, IUser };
