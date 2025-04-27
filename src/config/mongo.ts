import { MongoClient, Db } from "mongodb";
import { env } from "./env";

const uri = env.MONGO_URI as string;
const dbName = env.MONGO_DB as string;

if (!uri) {
  throw new Error("MONGO_URI is missing in environment variables");
}

let client: MongoClient;
let db: Db;

export const connectToMongo = async () => {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      console.log("✅ Connected to MongoDB");
      db = client.db(dbName);
    }
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
  return db;
};

export const mongoDB = () => {
  if (!db) {
    throw new Error("You must connect to MongoDB first (call connectToMongo)");
  }
  return db;
};

export const disconnectFromMongo = async () => {
  if (client) {
    await client.close();
  }
};
