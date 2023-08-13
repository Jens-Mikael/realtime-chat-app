"use client";
import ContactCard from "@/components/cards/ContactCard";
import ContactNav from "@/components/navigations/ContactNav";
import NewBtn from "../NewBtn";
import { useEffect, useState } from "react";
import DropdownSection from "./DropdownSection";
import { readUserChats } from "@/firebase/hooks/read";
import { useAuth } from "@/firebase/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "@/redux/slices/chatsSlice";
import { firestore } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

const ContactSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [requestsData, setRequestsData] = useState([]);
  const { uid } = useAuth();
  const chats = useSelector((state) => state.chats.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) {
      //listen for changes in currentuser doc
      const usersRequestsListener = onSnapshot(
        doc(firestore, `users/${uid}`),
        async (doc) => {
          setRequestsData(doc.data().requests);
          const data = await readUserChats(uid, doc.data().chats);
          dispatch(setChats(data));
        }
      );
    }
  }, [uid]);

  const handleCloseDropdownOnScroll = () => {
    const container = document.getElementById("mainContainer");
    if (container.scrollTop >= 500) setIsDropdownOpen(false);
  };

  // const handleCloseDropdown = () => {
  //   const container = document.getElementById("mainContainer");
  //   container.scroll({
  //     top: 500,
  //     left: 0,
  //     behavior: "smooth",
  //   })
  // }

  const handleOpenDropdown = () => {
    const container = document.getElementById("mainContainer");
    setIsScrolling(true);
    container.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  console.log(chats)

  return (
    <div
      id="mainContainer"
      onScroll={() => {
        if (isDropdownOpen) handleCloseDropdownOnScroll();
      }}
      scrol
      className="flex flex-col w-full max-w-[450px] max-h-full relative rounded-lg border h-fit overflow-y-auto scrollbar-none border-white border-opacity-20"
    >
      <DropdownSection
        isDropdownOpen={isDropdownOpen}
        requestsData={requestsData}
      />

      <div className="bg-[#001d29] z-20">
        <ContactNav
          requestNotification={requestsData.length}
          isDropdownOpen={isDropdownOpen}
          handleOpenDropdown={handleOpenDropdown}
          setIsDropdownOpen={setIsDropdownOpen}
        />

        <div className="flex flex-col gap-3 p-5 pt-0 flex-1 z-20 bg-[#001d29]">
          {chats &&
            uid &&
            chats.map((obj) => (
              <ContactCard
                displayData={obj.displayData}
                lastMessage={obj.lastMessage}
                currentUid={uid}
                chatKey={obj.chatKey}
                isGroup={obj.isGroup}
                key={obj.chatKey}
              />
            ))}
        </div>
      </div>
      <NewBtn />
    </div>
  );
};

export default ContactSection;
