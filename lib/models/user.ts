import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";

export interface User {
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  faculty?: string;
  department?: string;
  gender?: string;
  age?: number;
  weeklyCommitment?: number;
  interestReason?: string;
  originalPrice?: number;
  discountedPrice?: number;
  paymentStatus: "Pending" | "Paid" | "Failed" | "Cancelled";
}

export async function createUser(data: User) {
  const { db } = await connectToDatabase();
  const result = await db.collection("users").insertOne(data);
  return result.insertedId;
}

export async function getAllUsers() {
  const { db } = await connectToDatabase();
  const users = await db.collection("users").find({}).toArray();
  return users;
}

export async function getUsersBySkill(skillName: string) {
  const { db } = await connectToDatabase();
  const users = await db
    .collection("users")
    .find({ skills: skillName })
    .toArray();
  return users;
}

export async function updateUserPaymentStatus(userId: string, status: string) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(userId) },
      { $set: { paymentStatus: status } }
    );
  return result.modifiedCount > 0;
}
