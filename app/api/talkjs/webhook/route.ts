import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type TalkMessagePayload = {
  event: 'message.sent'
  data: {
    chat: {
      id: string
      content: string
      createdAt: number
      senderId: string
    }
    conversationId: string
    senderId: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TalkMessagePayload

    if (body.event !== 'message.sent') {
      return NextResponse.json({ message: 'ignored' })
    }

    const { chat, senderId, conversationId } = body.data

    // Upsert user by id
    const sender = await prisma.user.upsert({
      where: { id: senderId },
      update: {},
      create: {
        id: senderId,
        name: senderId.replace('test_', ''), // fallback name from ID
        email: `${senderId}@example.com`, // placeholder email
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
    senderId: sender.id,
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