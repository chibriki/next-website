

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";



export async function DELETE(req: NextRequest, props : {params: Promise<{ id: string }> }) {
  const {id}  = await props.params;
  try {
    await prisma.user.delete({
      where: { id_user: Number(id) },
    });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    window.location.reload();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Worker not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete worker' }, { status: 500 });
    
  }
}

