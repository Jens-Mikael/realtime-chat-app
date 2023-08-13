import SVG from "react-inlinesvg";

const DropdownNav = ({ isDropdownOpen,  }) => {
  return (
    <div className="sticky top-0 z-20">
      <div
        className={`flex justify-between items-center  bg-[#001d29] z-10 py-3 px-5 transition-[height] `}
      >
        <div className=" text-3xl font-medium">Info</div>
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
            </button>
          </div>
        </div>
      </div>
      <div className="h-6 w-full bg-gradient-to-b from-[#001d29] to-transparent" />
    </div>
  );
};

export default DropdownNav;

//${!isDropdownOpen && "h-0 overflow-hidden"}
