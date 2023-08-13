"use client";
import SVG from "react-inlinesvg";

const ContactNav = ({
  requestNotification,
  isDropdownOpen,
  handleOpenDropdown,
  setIsDropdownOpen,
}) => {
  return (
    <div
      className={`sticky top-0 z-30  ${
        isDropdownOpen && "border-white border-opacity-20 border-t"
      }`}
    >
      <div className="flex justify-between items-center bg-[#001d29] py-3 px-5">
        <div className=" text-3xl font-medium">Chat</div>
        <div className="flex gap-2">
          <div className="cursor-pointer p-2 hover:bg-opacity-10 transition rounded-full bg-white bg-opacity-0">
            <SVG
              src="icons/search-glass.svg"
              className="h-7 fill-white"
              loader={<div className="h-7 w-7" />}
            />
          </div>
          <div className="relative group">
            <button
              onClick={() =>
                setIsDropdownOpen((prev) => {
                  if (prev) {
                    return false;
                  } else {
                    handleOpenDropdown();
                    return true;
                  }
                })
              }
              className={`cursor-pointer p-2 bg-opacity-0 hover:bg-opacity-10 transition rounded-full bg-white `}
            >
              <SVG
                src={
                  isDropdownOpen
                    ? "icons/arrow-expand-up.svg"
                    : "icons/arrow-expand-down.svg"
                }
                className="h-7 fill-white"
                loader={<div className="h-7 w-7" />}
              />
              {requestNotification >= 1 && (
                <div className="absolute top-1 right-0.5 text-xs rounded-full bg-sky-400 w-4 h-4">{requestNotification}</div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="h-6 w-full bg-gradient-to-b from-[#001d29] to-transparent " />
    </div>
  );
};

export default ContactNav;
