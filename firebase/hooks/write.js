import { db } from "../config";
import { ref, set } from "firebase/database";

export const writeData = async (userId, name) => {
  try {
    const reference = ref(db, `users/${userId}`);
    const res = await set(reference, {
      username: name,
    });
    return res;
  } catch (err) {
    return err.message;
  }
};
