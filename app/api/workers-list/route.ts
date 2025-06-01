import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id_user: true,
      name: true,
      position: true,
      role: true,
      phone_number: true,
      id_team: true,
    },
  });

  return NextResponse.json(users);
}
