import { rtdb, firestore } from "../config";
import {
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  writeBatch,
} from "firebase/firestore";
import { push, ref, set } from "firebase/database";

export const writeContactRequest = async (currentUser, toUser) => {
  const data = {
    name: currentUser.displayName,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid,
  };

  console.log(data);

  const docRef = doc(firestore, `users/${toUser.uid}`);
  try {
    const res = await updateDoc(docRef, {
      requests: arrayUnion(data),
    });
    return res;
  } catch (err) {
    return err.message;
  }
};

export const acceptContactRequest = async (currentUser, acceptedUser) => {
  const currentUserRef = doc(firestore, `users/${currentUser}`);
  const acceptedUserRef = doc(firestore, `users/${acceptedUser}`);
  const chatRef = ref(rtdb, `chats`);
  const chatData = {
    info: {
      isGroup: false,
      uids: {
        1: currentUser,
        2: acceptedUser,
      },
    },
  };
  const batch = writeBatch(firestore);

  try {
    //get currentuser requests arr
    const docSnap = await getDoc(currentUserRef);
    const userReqArr = docSnap.data().requests;
    //filter out accepted user
    const filteredArr = userReqArr.filter((obj) => obj.uid !== acceptedUser);
    //create chatroom
    const chatKey = await push(chatRef, chatData);

    // update user request arr
    batch.update(currentUserRef, { requests: filteredArr });

    //add returned chatKey to users chats arr
    batch.update(currentUserRef, { chats: arrayUnion(chatKey.key) });
    batch.update(acceptedUserRef, { chats: arrayUnion(chatKey.key) });

    //add to contacts list
    batch.update(currentUserRef, { contacts: arrayUnion(acceptedUser) });
    batch.update(acceptedUserRef, { contacts: arrayUnion(currentUser) });

    const batchRes = await batch.commit();

    return batchRes;
  } catch (err) {
    return err;
  }
};

export const writeMessage = async () => {
  const jsonData = {};

  try {
    const res = await set(ref(rtdb, `users/${userId}`), jsonData);
    return res;
  } catch (err) {
    return err.message;
  }
};



