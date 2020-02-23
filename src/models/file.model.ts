import mongoose, { Schema, Document } from "mongoose";

interface IFile {
  type: string; // file, dir
  title: string;
  extension: string;
  icon: string;
  usersId: Array<string>;
  parentId: string;
  childrenId: Array<string>;
  creationDate: Date;
}

interface IFileDocument extends IFile, Document {}

const FileSchema: Schema = new Schema({
  type: { type: String, required: ["file", "dir"] },
  title: { type: String, required: true },
  extension: { type: String },
  icon: {
    type: String,
    required: [
      "file",
      "file-word",
      "file-text",
      "file-ppt",
      "file-excel",
      "file-image",
      "file-markdown",
      "file-pdf",
      "file-jpg",
      "file-zip",
      "folder"
    ]
  },
  usersId: { type: Array(String), required: true },
  parentId: { type: String },
  childrenId: { type: Array(String) },
  creationDate: { type: Date, required: true, default: new Date() }
});

const File = mongoose.model<IFileDocument>("File", FileSchema);

export { File, IFile };
