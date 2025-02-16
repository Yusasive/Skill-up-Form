import { NextRequest, NextResponse } from "next/server";
import { updateSkill, deleteSkill } from "@/lib/models/skills";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;

  if (!params || !params.id) {
    return NextResponse.json({ error: "Missing skill ID" }, { status: 400 });
  }

  const { id } = params;

  async function verifyAdmin() {
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

  const adminError = await verifyAdmin();
  if (adminError) return adminError;

  try {
    const { name, price, description } = await req.json();
    if (!name || !price || !description) {
      return NextResponse.json(
        { error: "All fields are required." },
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
  console.log("DELETE request received:", req.method);
  const { params } = context;

  async function verifyAdmin() {
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

  const adminError = await verifyAdmin();
  if (adminError) return adminError;

  try {
    const { id } = params;
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
