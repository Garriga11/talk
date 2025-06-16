

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
// Create users
const users = await Promise.all([
prisma.user.create({
data: {
talkId: 'test_user0',
email: 'test_user0@example.com',
name: 'test_user0',
password: await bcrypt.hash('password123', 10),
},
}),
prisma.user.create({
data: {
talkId: 'test_user1',
email: 'test_user1@example.com',
name: 'test_user1',
password: await bcrypt.hash('password123', 10),
},
}),
prisma.user.create({
data: {
talkId: 'test_user2',
email: 'test_user2@example.com',
name: 'test_user2',
password: await bcrypt.hash('password123', 10),
},
}),
prisma.user.create({
data: {
talkId: 'test_user3',
email: 'test_user3@example.com',
name: 'test_user3',
password: await bcrypt.hash('password123', 10),
},
}),
prisma.user.create({
data: {
talkId: 'test_user4',
email: 'test_user4@example.com',
name: 'test_user4',
password: await bcrypt.hash('password123', 10),
},
}),
])

const userIdMapping = {
garriga: users[0].id,
john: users[1].id,
james: users[2].id,
jay: users[3].id,
scott: users[4].id,
}

// Create posts
await prisma.post.createMany({
data: [
{
title: 'Savvy: A G19 Programs App',
content:
'Savvy: A social media prototype, a G19 Programs app, built on Next.js, Prisma, and Tailwind CSS...',
published: true,
authorId: userIdMapping.garriga,
},
{
title: 'Prisma vs. Other ORMs',
content: 'Database management can make or break a web app...',
published: true,
authorId: userIdMapping.garriga,
},
{
title: 'Debugging Deployment Issues',
content: 'Ever deployed an app only to find database conflicts...',
published: true,
authorId: userIdMapping.john,
},
{
title: 'Best Practices for Type Safety in ORMs',
content: 'Aliquam erat volutpat...',
published: true,
authorId: userIdMapping.john,
},
{
title: 'Simplifying Web Development',
content: 'Developers often juggle speed and functionality...',
published: false,
authorId: userIdMapping.john,
},
{
title: 'Integrating TalkJS for Real-Time Messaging',
content: 'Integrating TalkJS is a breeze...',
published: true,
authorId: userIdMapping.jay,
},
{
title: 'Webhooks vs. APIs',
content: 'Webhooks and APIs serve different purposes...',
published: true,
authorId: userIdMapping.jay,
},
{
title: 'Debugging Prisma Errors',
content: 'Prisma makes database interactions easy...',
published: true,
authorId: userIdMapping.jay,
},
{
title: 'Optimized My Next.js App',
content: 'Performance isn’t just about speed...',
published: true,
authorId: userIdMapping.scott,
},
{
title: 'Scaling Real-Time Chat',
content: 'Building a chat system is easy—scaling it is the real challenge...',
published: true,
authorId: userIdMapping.scott,
},
{
title: 'The Power of Tailwind CSS',
content: 'Tailwind CSS is more than just a utility-first framework...',
published: true,
authorId: userIdMapping.scott,
},
{
title: 'Building a Chat App with Next.js and Prisma',
content: 'This guide walks you through building a chat app...',
published: true,
authorId: userIdMapping.scott,
},
],
})

// Create a conversation
const conversation = await prisma.conversation.create({
data: {
talkId: 'test_convo1',
},
})

// Create messages in the conversation
await prisma.messages.upsert({
data: [
{
content: 'Hey, how are you?',
senderId: users[0].id,
conversationId: conversation.id,
createdAt: new Date(),
},
{
content: "I'm good! How about you?",
senderId: users[1].id,
conversationId: conversation.id,
createdAt: new Date(),
},
],
})

console.log('Seeding completed.')
}

main()
.then(() => prisma.$disconnect())
.catch(async (e) => {
console.error(e)
await prisma.$disconnect()
process.exit(1)
})