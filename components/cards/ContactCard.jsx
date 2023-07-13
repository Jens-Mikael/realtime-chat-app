"use client";
import { useState } from "react";

const ContactCard = ({ img, name, lastText, notify, selected }) => {
  const [isSelected, setIsSelected] = useState(selected);
  return (
    <div
      onClick={() => setIsSelected((prev) => !prev)}
      className={`flex cursor-pointer relative items-center py-3 px-5 gap-5 rounded-lg w-[400px] transition ${
        isSelected
          ? " bg-cyan-500 scale-105 shadow-cyan-500 shadow-glow "
          : "bg-white bg-opacity-5 hover:bg-opacity-10"
      }`}
    >
      <div>
        <img src={img} className="h-14 min-w-[56px] rounded-full" />
      </div>
      <div className="w-full max-w-[252px]">
        <div className="font-light text-lg truncate">{name}</div>
        <div className={`text-sm transition truncate ${isSelected ? "text-white text-opacity-90" : "text-[#aaaaaa]"}`}>{lastText}</div>
      </div>
      <div
        className={`${
          notify && !isSelected && "bg-cyan-400"
        } rounded-full w-3 h-3`}
      />
    </div>
  );
};

export default ContactCard;
