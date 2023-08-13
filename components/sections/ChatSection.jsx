"use client";
import ChatInput from "../ChatInput";
import MessageSection from "./MessageSection";
import ChatNav from "../navigations/ChatNav";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChatSection = () => {
  const currentChat = useSelector((state) => state.currentChat.value);
  const [scrollToBtmVisible, setScrollToBtmVisible] = useState(false);
  return (
    <div
      onScroll={() => {
        const element = document.getElementById("chatDiv");
        if (
          element.scrollTop + element.offsetHeight + 100 >=
          element.scrollHeight
        )
          setScrollToBtmVisible(false);
        else setScrollToBtmVisible(true);
      }}
      id="chatDiv"
      className=" min-w-[500px] grow border relative gap-2 flex flex-col border-white border-opacity-20 scrollbar-none overflow-y-auto rounded-lg"
    >
      {currentChat ? (
        <>
          <ChatNav
            displayData={currentChat.displayData}
            isGroup={currentChat.isGroup}
            chatKey={currentChat.chatKey}
          />
          <MessageSection
            chatKey={currentChat.chatKey}
            isGroup={currentChat.isGroup}
          />
          <ChatInput
            chatKey={currentChat.chatKey}
            isGroup={currentChat.isGroup}
            scrollToBtmVisible={scrollToBtmVisible}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatSection;
