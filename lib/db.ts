import { MongoClient, Db } from "mongodb";

let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  if (!dbName) {
    throw new Error("MONGODB_DB is not defined in the environment variables.");
  }

  
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri);
  await client.connect();

  
  cachedDb = client.db(dbName);

  return cachedDb;
}
