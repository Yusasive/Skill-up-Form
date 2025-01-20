import { connectToDatabase } from "@/lib/mongodb";

interface PaymentData {
  transactionId: string;
  amount: number;
  date: Date;
  status: string; 
}

export async function createPaymentRecord(data: PaymentData) {
  const { db } = await connectToDatabase();
  const result = await db.collection("payments").insertOne(data);
  return result.insertedId;
}

export async function getPaymentByTransactionId(transactionId: string) {
  const { db } = await connectToDatabase();
  const payment = await db.collection("payments").findOne({ transactionId });
  return payment;
}
