import { connectToDatabase } from '@/lib/mongodb';

export async function createPaymentRecord(data: any) {
  const { db } = await connectToDatabase();
  const result = await db.collection('payments').insertOne(data);
  return result.insertedId;
}

export async function getPaymentByTransactionId(transactionId: string) {
  const { db } = await connectToDatabase();
  const payment = await db.collection('payments').findOne({ transactionId });
  return payment;
}
