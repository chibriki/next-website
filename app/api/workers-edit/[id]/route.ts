// /app/api/workers-edit/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, props : {params: Promise<{ id: string }> }) {
  const {id}  = await props.params;
  const numericId = parseInt(id)

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const data = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id_user: numericId,
      },
      data: {
        username: data.username,
        position: data.position,
        name: data.name,
        role: data.role,
        phone_number: data.phone_number,
        id_team: parseInt(data.id_team),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
