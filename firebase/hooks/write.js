import { rtdb, firestore, storage } from "../config";
import {
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  writeBatch,
} from "firebase/firestore";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { uploadBytes, ref as storageRef } from "firebase/storage";

export const writeContactRequest = async (currentUser, toUser) => {
  const data = {
    requestType: "contact",
    data: {
      name: currentUser.displayName,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid,
    },
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
export const createGroup = async (currentUser, toUsers, groupData) => {
  const batch = writeBatch(firestore);
  const currentuserRef = doc(firestore, `users/${currentUser.uid}`);
  const chatRef = ref(rtdb, `chats`);
  const chatData = {
    info: {
      isGroup: true,
      displayData: {
        title: groupData.title,
      },
      uids: { 1: currentUser.uid },
    },
  };

  try {
    //get chat ID
    const chatRes = await push(chatRef, chatData);
    //upload group pfp to chatkey/groupPfp.png
    const groupPfpRef = storageRef(storage, `${chatRes.key}/groupPfp.jpeg`);
    const uploadGroupPfpRes = await uploadBytes(groupPfpRef, groupData.pfpFile);

    //structure request data
    const requestData = {
      requestType: "group",
      displayData: {
        title: groupData.title,
        photoPath: `${chatRes.key}/groupPfp.png`,
      },
      admin: {
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
        uid: currentUser.uid,
      },
      chatKey: chatRes.key,
    };
    //chat requests for users
    for (let i = 0; i < toUsers.length; i++) {
      const toUserRef = doc(firestore, `users/${toUsers[i]}`);
      batch.update(toUserRef, { requests: arrayUnion(requestData) });
    }
    //add chatkey to CUID chats arr
    batch.update(currentuserRef, { chats: arrayUnion(chatRes.key) });

    //commit batch
    const batchRes = await batch.commit();
    return;
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

export const writeMessage = async (sender, chatKey, data) => {
  const messagesRef = ref(rtdb, `chats/${chatKey}/messages`);
  const jsonData = {
    data,
    sender,
    timeStamp: serverTimestamp(),
  };

  try {
    const res = await push(messagesRef, jsonData);

    if (res) return "Message was successfully written";
    return res;
  } catch (err) {
    return err.message;
  }
};
