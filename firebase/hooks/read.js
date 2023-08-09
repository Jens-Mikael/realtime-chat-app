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
  } catch (err) {
    return err.message;
  }
};

export const readUserChats = async (user) => {
  const userDocRef = doc(firestore, `users/${user}`);

  try {
    //get user chatsArr
    const userDocSnap = await getDoc(userDocRef);
    const chatsArr = userDocSnap.data().chats;
    //push to arr from every chat the latest message and its data;
    let chatsDataArr = [];
    //loop through chats arr
    for (let i = 0; i < chatsArr.length; i++) {
      //create a ref that fetches only the last sent message
      const lastMessageRef = query(
        ref(rtdb, `chats/${chatsArr[i]}/messages`),
        limitToLast(1)
      );

      //fetch the last message
      const lastMessageSnap = await get(lastMessageRef);

      if (lastMessageSnap.exists()) {
        const lastMessage = lastMessageSnap.val();
        //push the data from the last sent message to the arr
        //ex: chatsDataObj[2].lastMessage.data.text
        chatsDataArr.push({
          lastMessage: lastMessage[1],
          chatKey: chatsArr[i],
        });
      } else {
        chatsDataArr.push({ lastMessage: {}, chatKey: chatsArr[i] });
      }

      //add chat info such as profile img uid, name, isOnline
      const chatInfoRef = ref(rtdb, `chats/${chatsArr[i]}/info`);
      const chatInfoSnap = await get(chatInfoRef);

      if (chatInfoSnap.exists()) {
        const chatInfo = chatInfoSnap.val();
        //remember to think about what happends with group chats
        if (!chatInfo.isGroup) {
          //filter out current uid
          const arrWithoutCurrentUserID = chatInfo.uids.filter(
            (uid) => uid !== user
          );
          const userDocRef = doc(
            firestore,
            `users/${arrWithoutCurrentUserID[0]}`
          );
          //fetch info from the left out uid
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userDoc = userDocSnap.data();
            //structure the data in to the main chats arr
            const newObj = {
              isGroup: chatInfo.isGroup,
              displayData: {
                name: userDoc.name,
                photoURL: userDoc.photoURL,
                uid: arrWithoutCurrentUserID[0],
              },
            };
            Object.assign(chatsDataArr[i], newObj);
          }
        }
      }
    }
    return chatsDataArr;
  } catch (err) {
    return err.message;
  }
};

export const readUserContacts = async (uid) => {
  const docRef = doc(firestore, `users/${uid}`);
  let userContacts;
  let userContactsData = [];
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      userContacts = docSnap
        .data()
        .contacts.filter((contact) => contact !== uid);
      for (let i = 0; i < userContacts.length; i++) {
        const docRef = doc(firestore, `users/${userContacts[i]}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const data = docSnap.data();
          const userObj = {
            uid: userContacts[i],
            displayData: {
              name: data.name,
              photoURL: data.photoURL,
            },
          };
          userContactsData.push(userObj);
        }
      }
      return userContactsData;
    }
    return "User current user does not exists in firestore";
  } catch (err) {
    return err.message;
  }
};
