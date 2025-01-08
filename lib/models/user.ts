import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function createUser(data: any) {
  const { db } = await connectToDatabase();
  const result = await db.collection('users').insertOne(data);
  return result.insertedId;
}

export async function getAllUsers() {
  const { db } = await connectToDatabase();
  const users = await db.collection('users').find({}).toArray();
  return users;
}

export async function updateUserPaymentStatus(userId: string, status: string) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection('users')
    .updateOne({ _id: new ObjectId(userId) }, { $set: { paymentStatus: status } });
  return result.modifiedCount > 0;
}
