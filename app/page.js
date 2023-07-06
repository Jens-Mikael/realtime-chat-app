"use client";
import { useAuth } from "@/firebase/context/AuthContext";

import { useState } from "react";
import { redirect } from "next/navigation";
import ContactSection from "@/components/sections/ContactSection";
import ChatSection from "@/components/sections/ChatSection";

export default function Home() {
  const { currentUser, logout, googleAuth, loading } = useAuth();
  const [input, setInput] = useState("");

  const writeToDd = async () => {
    const res = await writeData(currentUser.uid, input);
    if (res) {
      setInput("");
      console.log(res);
    }
  };

  if (!loading && !currentUser) redirect("/auth");

  return (
    <div className="flex flex-row gap-5 py-5 px-5 md:px-10 lg:px-14 h-screen">
      <ContactSection />
      <ChatSection />
    </div>
  );
}
