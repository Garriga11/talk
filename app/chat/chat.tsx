// app/chat/chat.tsx
"use client";
import Talk from "talkjs";
import { useEffect, useRef } from "react";

type ChatClientProps = {
  user: any; // Replace 'any' with a more specific type if available
  otherUser: any; // Replace 'any' with a more specific type if available
};

export default function ChatClient({ user, otherUser }: ChatClientProps) {
  const chatboxRef = useRef(null);

  useEffect(() => {
    let session: Talk.Session | null = null;
    Talk.ready.then(() => {
      const me = new Talk.User(user);
      const other = new Talk.User(otherUser);
      session = new Talk.Session({
        appId: "t1UpX8aQ", // <-- Hardcode your app ID here
        me,
      });
      const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
      conversation.setParticipant(me);
      conversation.setParticipant(other);
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxRef.current);
    });
    return () => {
      if (session) {
        session.destroy();
      }
    };
  }, [user, otherUser]);

  return <div ref={chatboxRef} style={{ width: 600, height: 500 }} />;
}