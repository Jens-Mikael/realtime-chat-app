"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FileResizer from "react-image-file-resizer";
import SVG from "react-inlinesvg";
import { useAuth } from "@/firebase/context/AuthContext";
import { readUserContacts } from "@/firebase/hooks/read";
import UserCard from "../cards/UserCard";
import { createGroup } from "@/firebase/hooks/write";
import { ClipLoader } from "react-spinners";

const NewGroupAction = ({ closeSection }) => {
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const [created, setCreated] = useState(false);
  const [creatingGroup, setCreatingGroup] = useState(false);

  useEffect(() => {
    if (currentUser.uid) getUserContacts();
  }, [currentUser.uid]);

  const getUserContacts = async () => {
    const res = await readUserContacts(currentUser.uid);
    if (res) setUserContacts(res);
  };

  const handleFileInputChange = async (file) => {
    //if file exists set name to it and image
    if (file) {
      FileResizer.imageFileResizer(
        file,
        96,
        96,
        "JPEG",
        100,
        0,
        (uri) => {
          setFile(uri);
          setImage(URL.createObjectURL(uri));
        },
        "file",
        96,
        96
      );
    }
  };

  const handleSubmit = async () => {
    setCreatingGroup(true);
    const res = await createGroup(currentUser, selectedUsers, {
      pfpFile: file,
      title: title,
    });

    if (!res) {
      console.log("Succeeded");
      setCreated(true);
    } else console.log(res);
    setCreatingGroup(false);
  };

  if (creatingGroup)
    return (
      <div className="flex justify-center">
        <ClipLoader color="#ffffff" />
      </div>
    );

  if (created)
    return (
      <div className="flex flex-col items-center gap-7">
        <div className="font-light text-lg">
          The group was successfully created!
        </div>
        <button
          onClick={closeSection}
          className="py-1 px-3 text-lg rounded-full hover:bg-white/10 bg-white/5 w-min transition cursor-pointer"
        >
          Close
        </button>
      </div>
    );

  return (
    <div className=" flex flex-col gap-5">
      <div className="text-3xl font-light">Create Group</div>
      <div className="flex flex-col gap-6">
        {/* GROUP NAME */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col text-[#aaaaaa] font-semibold">
            Title
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none bg-white bg-opacity-10 focus:bg-opacity-[0.15] focus:ring-1 transition ring-cyan-400 focus:shadow-glow focus:shadow-cyan-400 rounded-lg items-center flex px-3 py-2 ml-3"
          />
        </div>
        {/* PROFILE IMAGE */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col text-[#aaaaaa] font-semibold">
            Image
          </div>
          <div
            className={`ml-3 w-20 h-20 flex items-center justify-center relative bg-white/5 hover:bg-white/[0.15] shadow-2xl rounded-full cursor-pointer transition overflow-hidden ${
              file &&
              "shadow-glow shadow-cyan-400 border border-cyan-400 hover:border-0 hover:shadow-2xl hover:shadow-black"
            }`}
            onClick={() => document.getElementById("photo-input").click()}
          >
            <input
              onChange={(e) => handleFileInputChange(e.target.files[0])}
              id="photo-input"
              type="file"
              accept="image/*"
              className="hidden"
            />
            {file ? (
              <div className="group relative">
                <img
                  src={image}
                  alt={image.name}
                  className="h-20 w-20 group-hover:scale-105 transition"
                />
                <div
                  className={` bg-black/0 group-hover:bg-black/30 absolute inset-0 transition`}
                />
                <div
                  className={`inset-0 items-center justify-center flex absolute translate-y-[100px] group-hover:translate-y-0 transition-transform `}
                >
                  <SVG
                    src="icons/edit.svg"
                    className="h-8  fill-white pl-1 pb-1 "
                  />
                </div>
              </div>
            ) : (
              <>
                <SVG
                  src="icons/add-photo.svg"
                  className="h-10 m-5 fill-[#aaaaaa] pl-1 pb-1 "
                />
              </>
            )}
          </div>
        </div>

        {/* MAP THROUGH USER CONTACTS MEMBERS */}
        <div>
          <div className="flex flex-col text-[#aaaaaa] font-semibold">
            Members
          </div>
          <div className="flex flex-col gap-3 max-h-[400px] p-3 overflow-y-auto scrollbar-none">
            {userContacts.map((obj) => (
              <UserCard
                name={obj.displayData.name}
                photoURL={obj.displayData.photoURL}
                uid={obj.uid}
                action="newGroup"
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                key={obj.uid}
              />
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleSubmit}
            className="py-3 px-5 bg-white rounded-full bg-opacity-10 hover:scale-105 w-fit text-xl hover:bg-opacity-100 hover:bg-cyan-400 p-3 shadow-2xl hover:shadow-glow hover:shadow-cyan-400 transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGroupAction;
