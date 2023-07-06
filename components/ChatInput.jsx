"use client";
import { useRef, useEffect } from "react";
import SVG from "react-inlinesvg";
const ChatInput = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="sticky bottom-0 py-3 px-10 flex gap-5">
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
          placeholder="Write a text..."
          className="w-full h-full outline-none bg-white bg-opacity-10 focus:bg-opacity-[0.15] focus:ring-1 transition ring-cyan-400 focus:shadow-glow focus:shadow-cyan-400 rounded-full items-center flex px-5"
        />
      </div>
      <div className="rounded-full bg-[#001d29]">
        <div className="p-2 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-full cursor-pointer">
          <SVG
            src="icons/mic.svg"
            className="h-7 fill-white"
            loader={<div className="h-7 w-7" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
