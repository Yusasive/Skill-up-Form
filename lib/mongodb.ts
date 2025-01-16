import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (db) return { client, db };

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Please define MONGODB_URI and MONGODB_DB in your .env file');
  }

  client = await MongoClient.connect(process.env.MONGODB_URI);
  db = client.db(process.env.MONGODB_DB);

  return { client, db };
}