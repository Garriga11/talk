// app/chat/chat.tsx
"use client";
import Talk from "talkjs";
import { useEffect, useRef } from "react";

export default function ChatClient({ user, otherUser }) {
  const chatboxRef = useRef(null);

  useEffect(() => {
    let session = null;
    Talk.ready.then(() => {
      const me = new Talk.User(user);
      const other = new Talk.User(otherUser);
      session = new Talk.Session({
        appId: "YOUR_TALKJS_APP_ID", // <-- Hardcode your app ID here
        me,
      });
      const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
      conversation.setParticipant(me);
      conversation.setParticipant(other);
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxRef.current);
    });
    return () => session && session.destroy();
  }, [user, otherUser]);

  return <div ref={chatboxRef} style={{ width: 600, height: 500 }} />;
}