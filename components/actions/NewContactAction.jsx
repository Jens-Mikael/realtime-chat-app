"use client";
import { useEffect, useState } from "react";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import UserCard from "../cards/UserCard";
import { useAuth } from "@/firebase/context/AuthContext";

const NewContactAction = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    handleGetUsers();
  }, []);

  //fetch users that are addable;
  const handleGetUsers = () => {
    const functions = getFunctions();
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    const getUserAddableContacts = httpsCallable(
      functions,
      "getUserAddableContacts"
    );
    getUserAddableContacts({ uid: currentUser.uid })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
  };

  if (loading || !data) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="text-3xl font-light">Our Users:</div>
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto p-3 scrollbar-none ">
        {data.map((i) => (
          <UserCard
            name={i.name}
            photoURL={i.photoURL}
            uid={i.uid}
            key={i.uid}
          />
        ))}
      </div>
    </>
  );
};

export default NewContactAction;
