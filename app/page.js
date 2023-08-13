"use client";
import { useAuth } from "@/firebase/context/AuthContext";
import { redirect } from "next/navigation";
import ContactSection from "@/components/sections/ContactSection";
import ChatSection from "@/components/sections/ChatSection";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "@/redux/slices/currentChatSlice";
import { setChats } from "@/redux/slices/chatsSlice";

export default function Home() {
  const { currentUser, logout, loading } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(setCurrentChat(null));
    dispatch(setChats(null));
  };

  if (!loading && !currentUser) redirect("/auth");

  return (
    <div className="flex flex-row gap-5 py-5 px-5 md:px-10 lg:px-14 h-screen">
      <ContactSection />
      <ChatSection />
      <div className="flex flex-col gap-5">
        <button className="border" onClick={handleLogout}>
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
