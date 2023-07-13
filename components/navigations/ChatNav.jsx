import SVG from "react-inlinesvg";

const ChatNav = ({ userData }) => {
  return (
    <div className="sticky top-0 w-full z-10">

      <div className="flex justify-between items-center bg-[#001d29] py-3 px-5">
        <div className="flex gap-5 items-center">
          <img
            src="images/hamza.jpeg"
            className="h-14 min-w-[56px] rounded-full border-cyan-400 border-2 shadow-glow shadow-cyan-400"
          />
          <div>
            <div className="text-xl">{userData.name}</div>
            <div className="flex gap-1.5 items-center">
              <div
                className={`${
                  userData.isOnline
                    ? "bg-green-400 bg-opacity-90"
                    : "bg-white bg-opacity-30"
                } h-1.5 w-1.5 rounded-full`}
              />
              <div className="font-light text-sm">
                {userData.isOnline ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <div className="cursor-pointer p-2 hover:bg-opacity-10 transition rounded-full bg-white bg-opacity-0">
              <SVG
                src="icons/search-glass.svg"
                className="h-7 fill-white"
                loader={<div className="h-7 w-7" />}
              />
            </div>
            <div className="cursor-pointer p-2 hover:bg-opacity-10 transition rounded-full bg-white bg-opacity-0">
              <SVG
                src="icons/menu.svg"
                className="h-7 fill-white"
                loader={<div className="h-7 w-7" />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-6 w-full bg-gradient-to-b from-[#001d29] to-transparent" />
    </div>
  );
};

export default ChatNav;
