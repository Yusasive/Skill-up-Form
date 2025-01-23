require("dotenv").config();
import * as bcrypt from "bcrypt"; 
import { connectToDatabase } from "../lib/mongodb";

async function loginAdmin(email: string, password: string) {
 
  const { db } = await connectToDatabase();

  const admin = await db.collection("admins").findOne({ email });

  if (!admin) {
    console.log("Admin not found");
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (isPasswordValid) {
    if (admin.role === "admin") {
      console.log("Login successful: Admin role confirmed");
      return true;
    } else {
      console.log("Access denied: Not an admin");
      return false;
    }
  } else {
    console.log("Incorrect password");
    return false;
  }
}

const email = "";
const password = ""; 

loginAdmin(email, password).catch(console.error);
