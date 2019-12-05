import "dotenv/config";
import mongoose, { Connection, ConnectionOptions } from "mongoose";

export default function connect(): void {
  const MONGODB_URL: string = process.env.MONGODB as string;
  const MONGODB_OPTS: ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  };

  mongoose.connect(MONGODB_URL, MONGODB_OPTS);

  const db: Connection = mongoose.connection;
  db.on("error", () =>
    console.error(`DB failed to connect at "${MONGODB_URL}"`)
  );
  db.on("open", () => console.log(`DB is connected at "${MONGODB_URL}"`));
}
