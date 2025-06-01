  import { NextRequest, NextResponse } from 'next/server'
  import prisma from '@/app/lib/db' 
  import { getUserFromCookies } from '@/app/lib/auth' 

  export async function GET(req: NextRequest, props: {params: Promise<{ teamId: string }> }) {
    const user = await getUserFromCookies(req.cookies)

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const {teamId} = await props.params;

    if (user.role !== 'ADMIN' && user.id_team !== Number(teamId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const messages = await prisma.message.findMany({
      where: { chat: { id_team: Number(teamId) } },
      include: { user: true },
      orderBy: { created_at: 'asc' },
    })

    return NextResponse.json(messages)
  }

  export async function POST(req: NextRequest, props: {params: Promise<{ teamId: string }> }) {
    const user = await getUserFromCookies(req.cookies)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { content } = await req.json()

    const {teamId} = await props.params;
    const chat = await prisma.chat.findUnique({ where: { id_team: Number(teamId) } })

    if (!chat) return NextResponse.json({ error: 'Chat not found' }, { status: 404 })

    const newMessage = await prisma.message.create({
      data: {
        content,
        id_user: user.id_user,
        id_chat: chat.id_chat,
      },
    })

    return NextResponse.json(newMessage)
  }
