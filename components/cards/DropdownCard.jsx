"use client";
import { useAuth } from "@/firebase/context/AuthContext";
import {
  acceptContactRequest,
  acceptGroupRequest,
} from "@/firebase/hooks/write";
import { readUserChats } from "@/firebase/hooks/read";
import { useDispatch } from "react-redux";
import { setChats } from "@/redux/slices/chatsSlice";

const DropdownCard = ({ data, isGroup }) => {
  const { uid } = useAuth();
  const dispatch = useDispatch();

  const handleAccept = async () => {
    if (isGroup) {
      //handle the shit for the group
      const res = await acceptGroupRequest(uid, data.chatKey);
      console.log(res);
      if (!res) {
        console.log("Group req acc succeeded");
        const data = await readUserChats(uid);
        dispatch(setChats(data));
      }
    } else {
      const res = await acceptContactRequest(currentUserUID, uid);
      console.log(res);
    }
  };

  return (
    <div
      className={`flex relative items-center py-3 px-5 gap-5 rounded-lg w-[400px] transition bg-white bg-opacity-5`}
    >
      <div>
        <img
          src={data.displayData.photoURL}
          className="h-14 w-14 min-w-[56px] rounded-full"
        />
      </div>
      <div className="w-full max-w-[200px] flex flex-col">
        {isGroup ? (
          <>
            <div className="text-xs font-light text-[#aaaaaa]">
              <span className="font-medium text-sm">
                {data.admin.displayName}
              </span>{" "}
              invited you to the group{" "}
              <span className="font-medium text-sm">
                "{data.displayData.title}"
              </span>
              .
            </div>
          </>
        ) : (
          <>
            <div className="text-xs font-light text-[#aaaaaa]">
              New Contact request from
            </div>
            <div className="font-medium text-base truncate">{data.name}</div>
          </>
        )}
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
