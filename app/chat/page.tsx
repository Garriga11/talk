// app/chat/page.tsx
import prisma from "@/lib/prisma";
import ChatClient from "@/app/chat/chat";

export default async function ChatPage() {
  const users = await prisma.user.findMany({ take: 2 });
  if (users.length < 2) return <div>Not enough users</div>;
  const [user, otherUser] = users;
  return (
    <ChatClient
      user={{ id: user.id, name: user.name ?? "", email: user.email }}
      otherUser={{ id: otherUser.id, name: otherUser.name ?? "", email: otherUser.email }}
    />
  );
}