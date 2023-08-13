"use client";
import { setCurrentChat } from "@/redux/slices/currentChatSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";

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

  useEffect(() => {
    if (isGroup) {
    }
  });
  console.log(lastMessage)

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
        {chatKey === "global" ? (
          <>
            <SVG
              className="fill-white h-14 w-14"
              src="icons/global.svg"
              loader={<div className="h-14 w-14" />}
            />
          </>
        ) : (
          <img
            src={displayData.photoURL}
            className="h-14 w-14 min-w-[56px] rounded-full fill-white"
          />
        )}
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
            `${lastMessage.sender.uid === currentUid && "Me:"} ${
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
