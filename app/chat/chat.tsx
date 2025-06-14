"use client";
import Talk from "talkjs";
import { useEffect, useRef } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ChatClient({
  user,
  otherUser,
}: {
  user: User;
  otherUser: User;
}) {
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let session: Talk.Session | null = null;

    Talk.ready.then(() => {
      const me = new Talk.User({
        id: user.id,
        name: user.name,
        email: user.email,
        role: "user",
      });

      const other = new Talk.User({
        id: otherUser.id,
        name: otherUser.name,
        email: otherUser.email,
        role: "user",
      });

      session = new Talk.Session({
        appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID!,
        me,
      });

      const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxRef.current!);
    });

    return () => {
      if (session) {
        session.destroy();
      }
    };
  }, [user, otherUser]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <div
        ref={chatboxRef}
        style={{
          width: "100%",
          maxWidth: 600,
          height: 500,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
        className="bg-white"
      />
    </div>
  );
}