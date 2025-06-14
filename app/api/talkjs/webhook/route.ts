import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type TalkMessagePayload = {
  event: 'message.sent'
  data: {
    message: {
      id: string
      text: string
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

    const { message, senderId, conversationId } = body.data

    // Upsert user by id
    const sender = await prisma.user.upsert({
      where: { id: senderId },
      update: {},
      create: {
        id: senderId,
        name: senderId.replace('test_', '') // fallback name from ID
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

    // Create the chat message
    await prisma.chat.create({
      data: {
        content: message.text,
        senderId: sender.id,
        conversationId: convo.id,
        createdAt: new Date(message.createdAt)
      }
    })

    return NextResponse.json({ message: 'saved' }, { status: 200 })
  } catch (err) {
    console.error('TalkJS webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}