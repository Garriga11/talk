import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // adjust if your prisma instance path is different

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
  return NextResponse.json({ message: 'Ignored non-message event' }, { status: 200 })
}

const { message, conversationId, senderId } = body.data 

const sender = await prisma.user.upsert({
  where: { talkId: senderId },
  update: {},
  create: {
    name: senderId.replace('test_', ''),
    email: `${senderId}@example.com`,
    talkId: senderId,
    password: 'defaultpassword' // Replace with a secure value or generate as needed
  }
})


const conversation = await prisma.conversation.upsert({
  where: { talkId: conversationId },
  update: {},
  create: { talkId: conversationId }
})


await prisma.message.create({
  data: {
    id: message.id,
    content: message.text,
    senderId: sender.id,
    conversationId: conversation.id,
    createdAt: new Date(message.createdAt)
  }
})

return NextResponse.json({ message: 'Saved' }, { status: 200 })
} catch (err) {
console.error('[TalkJS webhook error]', err)
return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
}
}