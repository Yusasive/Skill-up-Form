import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function createSkill(
  name: string,
  price: number,
  description: string
) {
  const { db } = await connectToDatabase();
  const result = await db.collection("skills").insertOne({
    name,
    price,
    description,
  });
  return result.insertedId;
}

export async function getAllSkills() {
  const { db } = await connectToDatabase();
  const skills = await db.collection("skills").find({}).toArray();
  return skills;
}

export async function updateSkill(
  id: string,
  newName: string,
  newPrice: number,
  newDescription: string
) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("skills")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: newName, price: newPrice, description: newDescription } }
    );
  return result.modifiedCount > 0;
}

export async function deleteSkill(id: string) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("skills")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
