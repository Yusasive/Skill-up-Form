import { NextRequest, NextResponse } from "next/server";
import { updateSkill, deleteSkill } from "@/lib/models/skills";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function verifyAdmin(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: No session found" },
      { status: 401 }
    );
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }

  return null; 
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const adminError = await verifyAdmin(req);
  if (adminError) return adminError;

  try {
    const { id } = context.params;
    const { name, price, description } = await req.json();

    if (!name || !price || !description) {
      return NextResponse.json(
        { error: "All fields (name, price, description) are required." },
        { status: 400 }
      );
    }

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

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const adminError = await verifyAdmin(req);
  if (adminError) return adminError;

  try {
    const { id } = context.params;
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
