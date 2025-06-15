import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type TalkMessagePayload = {
  event: 'message.sent'
  data: {
    chat: {
      id: string
      content: string
      createdAt: number
      userId: string
    }
    conversationId: string
    userId: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TalkMessagePayload

    if (body.event !== 'message.sent') {
      return NextResponse.json({ message: 'ignored' })
    }

    const { chat, userId, conversationId } = body.data

    // Upsert user by id
    const sender = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: userId.replace('test_', ''), // fallback name from ID
        email: `${userId}@example.com`, // placeholder email
        password: 'changeme' 
      }
    })

    // Upsert conversation by id
    const convo = await prisma.conversation.upsert({
      where: { id: conversationId },
      update: {},
      create: {
        id: conversationId
      }
    })

await prisma.chat.upsert({
  where: { id: chat.id },
  update: {},
  create: {
    id: chat.id,
    content: chat.content,
    userId: chat.userId,
    conversationId: convo.id,
    createdAt: new Date(chat.createdAt)
  }
});

    return NextResponse.json({ message: 'saved' }, { status: 200 })
  } catch (err) {
    console.error('TalkJS webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}