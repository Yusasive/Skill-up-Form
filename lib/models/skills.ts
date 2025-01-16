import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export interface Skill {
  name: string;
  price: number;
  description: string;
  count?: number; // Number of users registered for this skill
}

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

export async function getAllSkillsWithCounts() {
  const { db } = await connectToDatabase();

  // Fetch all skills
  const skills = await db.collection("skills").find({}).toArray();

  // Fetch user data
  const users = await db.collection("users").find({}).toArray();

  // Map skills to include user counts
  const skillsWithCounts = skills.map((skill) => {
    const count = users.filter((user) =>
      user.skills.includes(skill.name)
    ).length;

    return {
      _id: skill._id,
      name: skill.name,
      price: skill.price,
      description: skill.description,
      count, // Registered user count
    };
  });

  return skillsWithCounts;
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
