import SVG from "react-inlinesvg";

const ContactNav = () => {
  return (
    <div className="sticky top-0 z-10">
      <div className="flex justify-between items-center  bg-[#001d29] py-3 px-5">
        <div className=" text-3xl font-medium">Chat</div>
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
      <div className="h-6 w-full bg-gradient-to-b from-[#001d29] to-transparent " />

    </div>
  );
};

export default ContactNav;
