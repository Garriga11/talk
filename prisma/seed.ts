import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'garriga11@outlook.com',
        name: 'garriga',
        password: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'john',
        password: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        email: 'james@example.com',
        name: 'james',
        password: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        email: 'jay@example.com',
        name: 'jay',
        password: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        email: 'scott@example.com',
        name: 'scott',
        password: await bcrypt.hash('password123', 10),
      },
    }),
  ]);

  const userIdMapping = {
    garriga: users[0].id,
    john: users[1].id,
    james: users[2].id,
    jay: users[3].id,
    scott: users[4].id,
  };

  // Create 15 posts distributed among users
  await prisma.post.createMany({
    data: [
      
      { 
        title: 'Savvy: A G19 Programs App', 
        content: 'Savvy: A social media prototype, a G19 Programs app, butilt on Next.js, Prisma, and Tailwind CSS. It features user authentication, profile management, and a feed of posts from followed users.',
        published: true, 
        authorId: userIdMapping.garriga
      },
      
      { 
        title: 'Prisma vs. Other ORMs: Why Developers are Switching', 
        content: 'Database management can make or break a web application’s performance. Prisma offers type safety, migrations, and a sleek query engine—but is it the right tool for you?',
        published: true,
        authorId: userIdMapping.garriga 
      },

      
      { 
        title:  'Debugging Deployment Issues: A Developer’s Survival Guide', 
        content: 'Ever deployed an app only to find database conflicts, failing builds, and styling inconsistencies? Here’s a step-by-step guide to overcoming the most common deployment roadblocks.',
        published: true, 
        authorId: userIdMapping.john
      },
      { 
        title: 'Best Practices for Type Safety in ORMs', 
        content: 'Aliquam erat volutpat. Suspendisse potenti. Maecenas fringilla elit vel eros laoreet, et tempor sapien vulputate.', 
        published: true, 
        authorId: userIdMapping.john
      },
      { 
        title: 'Simplifying Web Development: How to Build Faster Without Losing Quality', 
        content: 'Developers often juggle speed and functionality when building web apps. But what if you could simplify development without sacrificing features? Let’s explore some proven strategies.',
        published: false, 
        authorId: userIdMapping.john
      },
      


      { 
        title: 'Integrating TalkJS for Real-Time Messaging in Next.js', 
        content: 'Integrating TalkJS for Real-Time Messaging in Next.js is a breeze with its intuitive API. This guide walks you through setting up TalkJS in your Next.js application, enabling real-time chat features effortlessly.',
        published: true, 
        authorId: userIdMapping.jay
      },
      { 
        title: 'Webhooks vs. APIs: Choosing the Right Data Flow', 
        content: 'Webhooks and APIs serve different purposes in data flow. This article explains when to use each, how they work, and the best practices for implementing them in your applications.',
        published: true, 
        authorId: userIdMapping.jay 
      },
      { 
        title: 'Debugging Prisma Errors: A Practical Guide', 
        content: 'Prisma makes database interactions easy—until it doesn’t. If you’ve ever run into migration conflicts, relation issues, or unexpected queries, this guide will save you hours of debugging.',
        published: true,
        authorId: userIdMapping.jay
      },

      
      { 
        title: 'How I Optimized My Next.js App for Lightning-Fast Performance', 
        content: 'Performance isn’t just about speed—it’s about reliability and scalability. Here’s how I tackled bottlenecks in my Next.js project and got it running smoother than ever.', 
        published: true, 
        authorId: userIdMapping.scott
      },
      { 
        title: 'Scaling Real-Time Chat: Handling Thousands of Messages per Second', 
        content: 'Building a chat system is easy—scaling it is the real challenge. Here’s how to optimize messaging throughput while keeping interactions real-time and responsive.',
        published: true, 
        authorId: userIdMapping.scott
      },
      { 
        title: 'The Power of Tailwind CSS: Why Developers Are Switching',
        content: 'Tailwind CSS is more than just a utility-first framework; it’s a game-changer for rapid UI development. This article explores why developers are making the switch and how it can benefit your projects.', 
        
        published: true, 
        authorId: userIdMapping.scott
      },
      
     
      { 
        title: 'Building a Chat App with Next.js and Prisma', 
        content: 'Building a chat app with Next.js and Prisma is straightforward. This guide walks you through setting up real-time messaging, user authentication, and database management using these powerful tools.',
        published: true, 
        authorId: userIdMapping.scott
      },
    ],
  });

// ...existing user creation code...

// 1. Create a conversation
const conversation = await prisma.conversation.create({
  data: {},
});

// 2. Create chat messages in that conversation
await prisma.chat.createMany({
  data: [
    {
      content: "Hey, how are you?",
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
});



  
  console.log('Seeding completed.');
} 

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


