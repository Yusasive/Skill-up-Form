import { NextRequest, NextResponse } from "next/server";
import { updateSkill, deleteSkill } from "@/lib/models/skills";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const { name, price, description } = await req.json();

    if (!name || !price || !description) {
      return NextResponse.json(
        { error: "All fields (name, price, description) are required." },
        { status: 400 }
      );
    }

    const success = await updateSkill(id as string, name, price, description);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to update skill." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Skill updated successfully" });
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
     const id = req.nextUrl.searchParams.get("id"); 
    const success = await deleteSkill(id as string);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete skill." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
