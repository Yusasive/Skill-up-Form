import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/models/user";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const skill = url.searchParams.get("skill");

    const users = await getAllUsers();

    if (skill) {
      const filteredUsers = users.filter((user) => user.skills.includes(skill));
      return NextResponse.json(filteredUsers);
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 }
    );
  }
}
