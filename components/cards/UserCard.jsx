"use client";
import { useAuth } from "@/firebase/context/AuthContext";
import { writeContactRequest } from "@/firebase/hooks/write";
import { useState } from "react";

const UserCard = ({ name, photoURL, uid }) => {
  const { currentUser } = useAuth();
  const [isSelected, setIsSelected] = useState(false);

  const handleContactRequest = async () => {
    const res = await writeContactRequest({
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid,
    }, {uid: uid});

    console.log(res)
  };

  return (
    <>
      <div
        onClick={() => setIsSelected((prev) => !prev)}
        className={`flex cursor-pointer items-center py-3 px-5 gap-5 rounded-lg w-full bg-white transition hover:bg-opacity-20 hover:scale-105 bg-opacity-5`}
      >
        <div>
          <img src={photoURL} className="h-10 min-w-[40px] rounded-full" />
        </div>
        <div className="w-full max-w-[252px]">
          <div className="font-light text-lg">{name}</div>
        </div>
      </div>
      {isSelected && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              onClick={() => setIsSelected(false)}
              className="inset-0 absolute bg-black opacity-30 rounded-lg"
            />
            <div className="z-40 bg-[#001d29] p-6 rounded-lg flex flex-col gap-5 items-center">
              <div className="text-xl font-light rounded-lg text-center">
                Send request to <span className="font-bold">{name}</span>?
              </div>
              <button onClick={handleContactRequest} className="py-2 px-4 bg-white rounded-full bg-opacity-10 hover:scale-105 w-fit text-xl hover:bg-opacity-100 hover:bg-cyan-400 p-3 shadow-2xl hover:shadow-glow hover:shadow-cyan-400 transition cursor-pointer">
                Let's do it!
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserCard;
