import { NextResponse } from "next/server";
import { getAllSkills } from "@/lib/models/skills";
import { getAllUsers } from "@/lib/models/user";

export async function GET() {
  try {
    // Fetch skills
    const skills = await getAllSkills(); // [{ name: "Frontend Development" }, ...]

    // Fetch users
    const users = await getAllUsers(); // [{ skills: "Frontend Development", ... }, ...]

    // Count users under each skill
    const skillCounts = skills.map((skill) => {
      const count = users.filter(
        (user) => user.skills.toLowerCase() === skill.name.toLowerCase()
      ).length;

      return { name: skill.name, count };
    });

    return NextResponse.json(skillCounts);
  } catch (error) {
    console.error("Error fetching skills and counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills and counts" },
      { status: 500 }
    );
  }
}
