"use client";
import { useState } from "react";
import SVG from "react-inlinesvg";
import NewSection from "./sections/NewSection";
const NewBtn = () => {
  const [isNewSectionOpen, setIsNewSectionOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsNewSectionOpen(true)}
        className="bg-white sticky bottom-5 mr-5 z-20 rounded-full bg-opacity-20 hover:bg-opacity-100 p-3 self-end hover:scale-105 shadow-2xl hover:shadow-glow hover:shadow-cyan-400 hover:bg-cyan-400 transition cursor-pointer"
      >
        <SVG
          src="icons/remove.svg"
          className="h-8 fill-white rotate-45"
          loader={<div className="h-8 w-8" />}
        />
      </div>
      {isNewSectionOpen && (
        <NewSection closeSection={() => setIsNewSectionOpen(false)} />
      )}
    </>
  );
};

export default NewBtn;
