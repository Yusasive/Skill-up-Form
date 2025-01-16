import { NextRequest, NextResponse } from "next/server";
import { updateSkill, deleteSkill } from "@/lib/models/skills";

// Handle PUT request to update a skill
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // Access params correctly (no await needed here)
    const { name, price, description } = await req.json();

    // Validate request body
    if (!name || !price || !description) {
      return NextResponse.json(
        { error: "All fields (name, price, description) are required." },
        { status: 400 }
      );
    }

    // Update the skill
    const success = await updateSkill(id, name, price, description);

    if (!success) {
      return NextResponse.json(
        { error: `Skill with ID ${id} not found or update failed.` },
        { status: 404 }
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

// Handle DELETE request to delete a skill
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // Access params correctly (no await needed here)

    // Delete the skill
    const success = await deleteSkill(id);

    if (!success) {
      return NextResponse.json(
        { error: `Skill with ID ${id} not found or deletion failed.` },
        { status: 404 }
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
