"use client";
import { setCurrentChat } from "@/redux/slices/currentChatSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactCard = ({
  displayData,
  lastMessage,
  currentUid,
  chatKey,
  isGroup,
}) => {
  const currentChat = useSelector((state) => state.currentChat.value);
  const dispatch = useDispatch();
  const isSelected = currentChat && currentChat.chatKey === chatKey;
  const handleClick = () => {
    dispatch(
      setCurrentChat({
        displayData,
        currentUid,
        chatKey,
        isGroup,
      })
    );
  };

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer relative items-center py-3 px-5 gap-5 rounded-lg w-full transition ${
        isSelected
          ? " bg-cyan-500 scale-105 shadow-cyan-500 shadow-glow "
          : "bg-white bg-opacity-5 hover:bg-opacity-10"
      }`}
    >
      <div>
        <img
          src={displayData.photoURL}
          className="h-14 min-w-[56px] rounded-full"
        />
      </div>
      <div className="w-full max-w-[252px]">
        <div className="font-light text-lg truncate">{displayData.name}</div>
        <div
          className={`text-sm transition truncate ${
            isSelected ? "text-white text-opacity-90" : "text-[#aaaaaa]"
          }`}
        >
          {lastMessage &&
            "data" in lastMessage &&
            `${lastMessage.sender === currentUid && "Me:"} ${
              lastMessage.data.text
            }`}
        </div>
      </div>
      {/* <div
        className={`${
          notify && !isSelected && "bg-cyan-400"
        } rounded-full w-3 h-3`}
      /> */}
    </div>
  );
};

export default ContactCard;

//
