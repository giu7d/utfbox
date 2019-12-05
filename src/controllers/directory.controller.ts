import { IFile, File } from "../models/file.model";
import { updateUser } from "./user.controller";

interface CreateDirectoryInput {
  userId: string;
  directory: IFile;
}

interface GetDirectoryByIdInput {
  userId: string;
  directoryId: string;
}

async function createRootDirectory(userId: string) {
  const rootDirectoryInterface: IFile = {
    type: "dir",
    title: "root",
    icon: "folder",
    usersId: [userId],
    extension: "",
    parentId: "",
    childrenId: [],
    creationDate: new Date()
  };

  try {
    const rootDirectorySchema = new File(rootDirectoryInterface);
    await rootDirectorySchema.validate();
    await rootDirectorySchema.save();
    await updateUser(userId, { rootDirectoryId: rootDirectorySchema.id });
  } catch (err) {
    console.log(err);
  }
}

async function createDirectory(userId: string, directory: IFile) {
  const { usersId, parentId } = directory;

  usersId.push(userId);

  const directoryInterface = {
    ...directory,
    type: "dir",
    usersId
  };

  try {
    const directorySchema = new File(directoryInterface);
    await directorySchema.validate();
    await directorySchema.save();

    await _appendChildrenToDirectory(parentId, directorySchema.id);

    return directorySchema.id;
  } catch (err) {
    console.error(err);
  }
}

async function getDirectoryById(userId: string, directoryId: string) {
  return await File.findOne({ _id: directoryId, usersId: { $in: userId } })
    .select({
      extension: 0,
      __v: 0
    })
    .exec();
}

async function _appendChildrenToDirectory(
  directoryId: string,
  childrenId: Object
) {
  try {
    await File.findOneAndUpdate(
      { _id: directoryId },
      { $push: { childrenId } },
      {
        runValidators: true
      }
    );
  } catch (err) {
    console.error(err);
  }
}

// getDir
// deleteDir
// renameDir
// shareDirWithUser

export {
  createDirectory,
  createRootDirectory,
  getDirectoryById,
  CreateDirectoryInput,
  GetDirectoryByIdInput
};
