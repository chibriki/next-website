import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET(req: Request, props : { params: Promise<{ id: string }> }) {
  const {id} = await props.params;

  const user = await prisma.user.findUnique({
    where: { id_user: Number(id) },
    select: {
      name: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
