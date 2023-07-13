"use client";
import { useAuth } from "@/firebase/context/AuthContext";
import { redirect } from "next/navigation";
import SVG from "react-inlinesvg";
import { useState } from "react";

export default function Auth() {
  const { currentUser, loading, googleAuth } = useAuth();
  const [err, setErr] = useState("");

  if (!loading && currentUser) redirect("/");

  const handleAuth = async () => {
    const user = await googleAuth();
    if (user) {
      console.log(user); 
      const resFromWrite = await writeUserData(user);
      console.log(resFromWrite);
    } else console.log("did not run")
  };

  if (!loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[400px] gap-12 flex flex-col items-center border border-white border-opacity-20 p-10 rounded-lg font-light shadow-2xl">
          <div className="flex flex-col gap-5">
            <div className="text-4xl font-normal">Authentication</div>
            <div className=" text-[#aaaaaa]">
              You must log in to able to chat in real time worldwide with anyone
              who has access to the internet.
            </div>
          </div>
          {err && <div>{err}</div>}
          <button
          onClick={() => googleAuth()}
            className="bg-white py-2.5 rounded-lg border border-slate-400 w-full dark:border-none flex justify-center text-center grow hover:scale-105 transition cursor-pointer"
          >
            <SVG
              src="icons/google.svg"
              className="h-6"
              loader={<div className="h-6 w-6" />}
            />
          </button>
        </div>
      </div>
    );
}
