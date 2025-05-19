import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'
import { getUserFromCookies } from '@/app/lib/auth'

const GENERAL_CHAT_ID = 3 

export async function GET(req: NextRequest) {
  const user = await getUserFromCookies(req.cookies)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const messages = await prisma.message.findMany({
    where: { id_chat: GENERAL_CHAT_ID },
    include: { user: true },
    orderBy: { created_at: 'asc' },
  })

  return NextResponse.json(messages)
}

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies(req.cookies)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { content } = await req.json()

  const newMessage = await prisma.message.create({
    data: {
      content,
      id_user: user.id_user,
      id_chat: GENERAL_CHAT_ID,
    },
  })

  return NextResponse.json(newMessage)
}
