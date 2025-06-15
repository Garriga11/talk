"use client";
import Talk from "talkjs";
import { useEffect, useRef } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ChatClient({ user, otherUser }: { user: User; otherUser: User }) {
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let session: Talk.Session | null = null;
    Talk.ready.then(() => {
      const me = new Talk.User(user);
      const other = new Talk.User(otherUser);
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
      if (session) session.destroy();
    };
  }, [user, otherUser]);

  return <div ref={chatboxRef} style={{ width: 600, height: 500 }} />;
}