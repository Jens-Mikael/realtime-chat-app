import { ref, child, get, query, limitToLast } from "firebase/database";
import { rtdb, firestore } from "../config";
import { doc, getDoc } from "firebase/firestore";

export const readUserRequestsOnLoad = async (uid) => {
  const docRef = doc(firestore, `users/${uid}`);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().requests;
    }
  } catch {
    return err.message;
  }
};

export const readUserChats = async (user) => {
  const userDocRef = doc(firestore, `users/${user}`);

  try {
    //get user chatsArr
    const userDocSnap = await getDoc(userDocRef);
    const chatsArr = userDocSnap.data().chats;

    //add chat info such as profile img uid, name, isOnline


    //push to arr from every chat the latest message and its data;
    let chatsDataArr = [];
    //loop through chats arr
    for (let i = 0; i < chatsArr.length; i++) {
      //create a ref that fetches only the last sent message
      const lastMessageRef = query(ref(`chats/${chatsArr[i]}`), limitToLast(1));
      //fetch the last message
      get(lastMessageRef).then((snapshot) => {
        if (snapshot.exists()) {
          const lastMessage = snapshot.val();
          //push the data from the last sent message to the arr
          //ex: chatsDataObj[2].lastMessage.data.text
          chatsArr.push(lastMessage);
        }
      });
    }
    console.log(chatsDataArr);
  } catch (err) {
    return err.message;
  }
};

// chatsDataObj[i].lastMessage.data.text = lastMessage.data.text;
// chatsDataObj[i].lastMessage.sender = lastMessage.sender;
// chatsDataObj[i].lastMessage.timeStamp = lastMessage.timeStamp;
