"use client";
import { useEffect, useState } from "react";
import DropdownCard from "../cards/DropdownCard";
import DropdownNav from "../navigations/DropdownNav";
import { useAuth } from "@/firebase/context/AuthContext";
import { firestore } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { readUserRequestsOnLoad } from "@/firebase/hooks/read";

const DropdownSection = ({ isDropdownOpen }) => {
  const { uid } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //userRequestInit();
    if (uid) {
      //listen for rt updates
      const usersRequestsListener = onSnapshot(
        doc(firestore, `users/${uid}`),
        (doc) => {
          setData(doc.data().requests);
        }
      );
    }
  }, [uid]);

  // const userRequestInit = async () => {
  //   if (loading) {
  //     const res = await readUserRequestsOnLoad();
  //     if (res) {
  //       console.log(res);
  //       setData(res);
  //     }
  //     //setLoading(false);
  //   }
  // };
  //if (loading) return <div>loading...</div>;

  return (
    <div
      className={`transition-all sticky top-0 z-20  flex flex-col ${
        isDropdownOpen ? "h-[500px]" : "h-0"
      }`}
    >
      <div className="relative min-h-full overflow-y-scroll transition-all scrollbar-none">
        <DropdownNav isDropdownOpen={isDropdownOpen} />

        <div className="flex flex-col gap-3 pb-5 px-5 flex-1">
          {data.map((i) => (
            <DropdownCard
              data={i}
              requestType={i.requestType}
              key={i.uid ? i.uid : i.admin.uid}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownSection;
