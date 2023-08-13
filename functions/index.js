const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.userCreated = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      contacts: [user.uid],
      chats: ["global"],
      requests: [],
    });
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

exports.getUserAddableContacts = functions.https.onCall(
  async (data, context) => {
    // if not auth return err
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user not authenticated"
      );
    }
    const currentuserID = data.uid;
    // get currentuser friends uid
    const db = admin.firestore();
    const userRef = db.collection("users").doc(`${currentuserID}`);
    const docSnap = await userRef.get();
    const currentUserContacts = docSnap.data().contacts;

    // get data from all users that arent in currentuser contact list
    const usersData = [];
    await db
      .collection("users")
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          if (!currentUserContacts.includes(doc.id)) {
            const data = doc.data();
            usersData.push({
              name: data.name,
              photoURL: data.photoURL,
              uid: doc.id,
            });
          }
        })
      )
      .catch((err) => {
        return err.message;
      });
    // return users data
    return usersData;
  }
);
