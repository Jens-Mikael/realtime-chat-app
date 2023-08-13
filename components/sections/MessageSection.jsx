"use client";
import { useEffect, useState } from "react";
import MessageCard from "../cards/MessageCard";
import { limitToLast, onValue, query, ref } from "firebase/database";
import { rtdb } from "@/firebase/config";
import { useAuth } from "@/firebase/context/AuthContext";

const MessageSection = ({ chatKey, isGroup }) => {
  const [messages, setMessages] = useState();
  const [initFetched, setInitFetched] = useState(false);
  const { uid } = useAuth();

  useEffect(() => {
    //if chatkey changes
    setMessages(null);
    setInitFetched(false);
    const chatMessageRef = query(
      ref(rtdb, `chats/${chatKey}/messages`),
      limitToLast(100)
    );
    const chatMessagesListener = onValue(chatMessageRef, (snap) => {
      if (snap.exists()) {
        setMessages(snap.val());
      }
    });
  }, [chatKey]);

  useEffect(() => {
    if (messages && !initFetched) {
      const element = document.getElementById("scrollToElement");
      element.scrollIntoView();
      setInitFetched(true);
    }
  }, [messages]);

  return (
    <div
      className={`flex flex-col flex-1 gap-3 w-full  ${
        isGroup ? "pl-5 pr-16" : "px-16"
      } `}
    >
      {messages &&
        Object.keys(messages).map((key) => (
          <MessageCard
            content={messages[key].data}
            sender={messages[key].sender}
            currentUID={uid}
            isGroup={isGroup}
            timeStamp={messages[key].timeStamp}
            key={key}
          />
        ))}
      <div id="scrollToElement" />
    </div>
  );
};

export default MessageSection;

//
