"use client";
import ContactCard from "@/components/cards/ContactCard";
import ContactNav from "@/components/navigations/ContactNav";
import NewBtn from "../NewBtn";
import { useEffect, useState } from "react";
import DropdownSection from "./DropdownSection";
import { readUserChats } from "@/firebase/hooks/read";
import { useAuth } from "@/firebase/context/AuthContext";

const ContactSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [chatsData, setChatsData] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("ran")

    getChatsData();
  }, [])


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

  const getChatsData = async () => {
    if (!currentUser) return
    const data = await readUserChats(currentUser.uid)
    console.log(data);
    
  };

  console.log("jh ")

  

  return (
    <div
      id="mainContainer"
      onScroll={() => {
        if (isDropdownOpen) handleCloseDropdownOnScroll();
      }}
      scrol
      className="flex flex-col relative rounded-lg border overflow-y-auto scrollbar-none border-white border-opacity-20"
    >
      <DropdownSection isDropdownOpen={isDropdownOpen} />

      <div className="bg-[#001d29] z-20">
        <ContactNav
          isDropdownOpen={isDropdownOpen}
          handleOpenDropdown={handleOpenDropdown}
          setIsDropdownOpen={setIsDropdownOpen}
        />

        <div className="flex flex-col gap-3 p-5 pt-0 flex-1 z-20 bg-[#001d29]">
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
          <ContactCard
            img="images/hamza.jpeg"
            name="Hamza Ahmed"
            lastText="Bro check this out real quick becaus tis"
            notify={true}
          />
        </div>
      </div>
      <NewBtn />
    </div>
  );
};

export default ContactSection;
