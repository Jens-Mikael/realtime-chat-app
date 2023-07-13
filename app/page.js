"use client";
import { useAuth } from "@/firebase/context/AuthContext";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import ContactSection from "@/components/sections/ContactSection";
import ChatSection from "@/components/sections/ChatSection";
import { testWrite } from "@/firebase/hooks/write";
import { readUserChats } from "@/firebase/hooks/read";

export default function Home() {
  const { currentUser, logout, loading } = useAuth();

  //fetch user chats on page load
  useEffect(() => {
    // if (currentUser && !loading) {
    //   console.log("ran")
    //   getUserChats();
    // }
  }, []);

  const getUserChats = async () => {
    const res = await readUserChats(currentUser);
    console.log(res);
  };


  if (!loading && !currentUser) redirect("/auth");

  return (
    <div className="flex flex-row gap-5 py-5 px-5 md:px-10 lg:px-14 h-screen">
      <ContactSection />
      <ChatSection />
      <div className="flex flex-col gap-5">
        <button className="border" onClick={logout}>
          logout
        </button>
        {/* <button className="border" onClick={writeToDd}>
          write To rtdb
        </button> */}
      </div>
    </div>
  );
}

//-NZksAaxaoF4jnX5iY5U

//stack overflow for cloudfunctions to read data
//https://stackoverflow.com/questions/48375904/read-data-from-cloud-firestore-with-firebase-cloud-function

//yt tutorials for cloud functions
//https://www.youtube.com/watch?v=7EJeLbDVIgM&list=PL4cUxeGkcC9i_aLkr62adUTJi53y7OjOf&index=11

//cd functions && npm run lint -- --fix && cd ..
//firebase emulators:start --only functions
