import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { Role, Position } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        position: body.position as Position,
        name: body.name,
        role: body.role as Role,
        phone_number: body.phone_number || null,
        id_team: body.id_team ? parseInt(body.id_team, 10) : null,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
