"use client";
import { useAuth } from "@/firebase/context/AuthContext";
import { writeMessage } from "@/firebase/hooks/write";
import { useRef, useEffect, useState } from "react";
import SVG from "react-inlinesvg";

const ChatInput = ({ chatKey, isGroup, scrollToBtmVisible }) => {
  const inputRef = useRef(null);
  const { currentUser } = useAuth();
  const [input, setInput] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleNewMessage = async () => {
    if (input.length === 0) return;
    setInput("");
    const data = {
      text: input,
    };
    let sender;
    if (isGroup) {
      sender = {
        uid: currentUser.uid,
        name: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };
    } else {
      sender = {
        uid: currentUser.uid,
      };
    }
    const res = await writeMessage(sender, chatKey, data);
    console.log(res);
  };

  const handleScrollToBtm = () => {
    const element = document.getElementById("scrollToElement");
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky  bottom-0 py-3 px-10 flex gap-5">
      <div className="flex gap-5 items-center">
        <div className="rounded-full bg-[#001d29]">
          <div className="p-2 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-full cursor-pointer">
            <SVG
              src="icons/smiley.svg"
              className="h-7 fill-white"
              loader={<div className="h-7 w-7" />}
            />
          </div>
        </div>
        <div className="rounded-full bg-[#001d29]">
          <div className="p-2 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-full cursor-pointer">
            <SVG
              src="icons/klemmari.svg"
              className="h-7 fill-white"
              loader={<div className="h-7 w-7" />}
            />
          </div>
        </div>
      </div>
      <div className="grow rounded-full bg-[#001d29]">
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleNewMessage();
          }}
          placeholder="Write a text..."
          className="resize-none w-full h-full outline-none bg-white bg-opacity-10 focus:bg-opacity-[0.15] focus:ring-1 transition ring-cyan-400 focus:shadow-glow focus:shadow-cyan-400 rounded-full items-center flex px-5"
        />
      </div>
      {input === "" ? (
        <div className="rounded-full bg-[#001d29]">
          <div className="p-2 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-full cursor-pointer">
            <SVG
              src="icons/mic.svg"
              className="h-7 fill-white"
              loader={<div className="h-7 w-7" />}
            />
          </div>
        </div>
      ) : (
        <div onClick={handleNewMessage} className="rounded-full bg-[#001d29]">
          <div className="p-2 bg-white hover:bg-cyan-400 bg-opacity-20 hover:bg-opacity-100 rounded-full cursor-pointer hover:scale-105 shadow-2xl hover:shadow-glow hover:shadow-cyan-400 transition">
            <SVG
              src="icons/sendMessage.svg"
              className="h-7 fill-white"
              loader={<div className="h-7 w-7" />}
            />
          </div>
        </div>
      )}

      <div
        onClick={handleScrollToBtm}
        className={`absolute -top-14 right-2.5 transition rounded-full p-2 bg-white bg-opacity-10 hover:bg-opacity-20 ${
          scrollToBtmVisible ? "scale-100" : "scale-0"
        }`}
      >
        <SVG
          src="icons/arrow-expand-down.svg"
          className="h-7 fill-white"
          loader={<div className="h-7 w-7" />}
        />
      </div>
    </div>
  );
};

export default ChatInput;
