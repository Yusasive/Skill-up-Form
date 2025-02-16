import { NextRequest, NextResponse } from "next/server";
import { updateSkill, deleteSkill } from "@/lib/models/skills";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

type Params = { id: string };

export async function PUT(
  req: NextRequest,
  context: { params: Params } | unknown
) {
  const { params } = context as { params: Params };

  if (!params?.id) {
    return NextResponse.json({ error: "Missing skill ID" }, { status: 400 });
  }

  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized or insufficient permissions" },
      { status: 403 }
    );
  }

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
  context: { params: Params } | unknown
) {
  const { params } = context as { params: Params };

  if (!params?.id) {
    return NextResponse.json({ error: "Missing skill ID" }, { status: 400 });
  }

  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized or insufficient permissions" },
      { status: 403 }
    );
  }

  try {
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
