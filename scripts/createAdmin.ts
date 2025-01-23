require("dotenv").config();
import { connectToDatabase } from "../lib/mongodb";
import * as bcrypt from "bcrypt"; 

async function createAdmin(email: string, password: string, role: string) {

  const { db } = await connectToDatabase();

  
  const hashedPassword = await bcrypt.hash(password, 10);

  
  const admin = await db.collection("admins").insertOne({
    email,
    password: hashedPassword,
    role,
  });

  console.log("Admin user created with ID:", admin.insertedId);
}

const email = "";
const password = "";
const role = ""; 
createAdmin(email, password, role).catch(console.error);
