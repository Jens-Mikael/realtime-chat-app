//"use client"
import { acceptContactRequest } from "@/firebase/hooks/write";

const DropdownCard = ({ name, photoURL, uid, currentUserUID }) => {
  const handleAccept = async () => {
    const res = await acceptContactRequest(currentUserUID, uid);
    console.log(res)
  };

  return (
    <div
      className={`flex relative items-center py-3 px-5 gap-5 rounded-lg w-[400px] transition bg-white bg-opacity-5`}
    >
      <div>
        <img src={photoURL} className="h-14 min-w-[56px] rounded-full" />
      </div>
      <div className="w-full max-w-[200px] flex flex-col">
        <div className="text-xs font-light text-[#aaaaaa]">
          New contact request from
        </div>
        <div className="font-medium text-base truncate">{name}</div>
      </div>
      <div className="text-sm gap-1 flex flex-col">
        <button
          onClick={handleAccept}
          className="py-1 px-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-100 hover:scale-105 hover:shadow-glow hover:shadow-cyan-400 hover:bg-cyan-400 transition cursor-pointer"
        >
          Accept
        </button>
        <button className="rounded-full bg-white bg-opacity-0 hover:bg-opacity-5 py-1 px-2">
          Decline
        </button>
      </div>
    </div>
  );
};

export default DropdownCard;
