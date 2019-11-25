import "dotenv/config";
import mongoose, { Connection } from "mongoose";

export default function connect(): void {
  const MONGODB_URL = process.env.MONGODB as string;
  const MONGODB_OPTS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(MONGODB_URL, MONGODB_OPTS);

  const db: Connection = mongoose.connection;
  db.on("error", () =>
    console.error(`DB failed to connect at "${MONGODB_URL}"`)
  );
  db.on("open", () => console.log(`DB is connected at "${MONGODB_URL}"`));
}
