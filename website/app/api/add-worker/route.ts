import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Insert data into the database
    const newWorker = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,  // ⚠️ Hash passwords before storing in production!
        position: body.position,
        name: body.name,
        role: body.role,
        phone_number: body.phone_number || null,
        id_team: body.id_team ? parseInt(body.id_team) : null,
      },
    });

    return NextResponse.json({ success: true, user: newWorker }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false}, { status: 500 });
  }
}
