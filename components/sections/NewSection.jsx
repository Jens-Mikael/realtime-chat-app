"use client";
import SVG from "react-inlinesvg";
import { useState } from "react";
import NewContactAction from "../actions/NewContactAction";
const NewSection = ({ closeSection }) => {
  const [action, setAction] = useState("");

  return (
    <div className="flex items-center justify-center fixed inset-0 z-20">
      <div
        onClick={closeSection}
        className="fixed  inset-0 bg-black bg-opacity-50"
      ></div>
      <div className="z-30 rounded-lg relative w-full max-w-[400px] bg-[#001d29] p-10">
        {/* CLOSE BUTTON */}
        <div className="absolute hidden top-5 right-5 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full p-2">
          <SVG
            src="icons/close.svg"
            className="fill-white h-7 w-7"
            loader={<div className="h-7 w-7" />}
          />
        </div>

        {/* CONTENT */}
        <div className="w-full flex flex-col gap-10">
          {!action && (
            <>
              <div className="text-3xl font-light">What do you want to do?</div>
              <div className="flex flex-col gap-2">
                <div
                  onClick={() => setAction("newMessage")}
                  className=" bg-white bg-opacity-5 hover:bg-opacity-20 hover:scale-105 transition cursor-pointer rounded-lg flex gap-3 p-2 items-center"
                >
                  <div>
                    <SVG
                      src="icons/new-message.svg"
                      className="h-8 fill-white"
                      loader={<div className=" h-8 w-8" />}
                    />
                  </div>
                  <div className="text-lg font-light">New Message</div>
                </div>
                <div
                  onClick={() => setAction("newContact")}
                  className=" bg-white bg-opacity-5 hover:bg-opacity-20 hover:scale-105 transition cursor-pointer rounded-lg flex gap-3 p-2 items-center"
                >
                  <div>
                    <SVG
                      src="icons/new-contact.svg"
                      className="h-8 fill-white"
                      loader={<div className=" h-8 w-8" />}
                    />
                  </div>
                  <div className="text-lg font-light">New Contact</div>
                </div>
                <div
                  onClick={() => setAction("newGroup")}
                  className=" bg-white bg-opacity-5 hover:bg-opacity-20 hover:scale-105 transition cursor-pointer rounded-lg flex gap-3 p-2 items-center"
                >
                  <div>
                    <SVG
                      src="icons/new-group.svg"
                      className="h-8 w-8 fill-white m-0"
                      loader={<div className=" h-8 w-8" />}
                    />
                  </div>
                  <div className="text-lg font-light">New Group</div>
                </div>
              </div>
            </>
          )}

          {/* NEW CONTACT */}
          {action === "newContact" && <NewContactAction />}
        </div>
      </div>
    </div>
  );
};

export default NewSection;
