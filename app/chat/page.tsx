import prisma from "@/lib/prisma";
import ChatClient from "@/app/chat/chat"; // see below

export default async function ChatPage() {
  // Example: get two users from your DB
  const user = await prisma.user.findUnique({ where: { id: "user1" } });
  const otherUser = await prisma.user.findUnique({ where: { id: "user2" } });

  if (!user || !otherUser) {
    return <div>Users not found</div>;
  }

  return (
    <ChatClient
      user={{ ...user, name: user.name ?? "" }}
      otherUser={{ ...otherUser, name: otherUser.name ?? "" }}
    />
  );
}