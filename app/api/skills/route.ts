import { NextRequest, NextResponse } from "next/server";
import { createSkill, getAllSkills } from "@/lib/models/skills";

export async function GET() {
  try {
    const skills = await getAllSkills();
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, description } = await req.json();

    if (!name || !price || !description) {
      return NextResponse.json(
        { error: "All fields (name, price, description) are required." },
        { status: 400 }
      );
    }

    const newSkill = await createSkill(name, price, description);
    return NextResponse.json({
      message: "Skill created successfully",
      skillId: newSkill,
    });
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
