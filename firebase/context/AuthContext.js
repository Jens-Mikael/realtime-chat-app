"use client";
import { auth } from "../config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from "firebase/auth";
import { createContext } from "react";
import { useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userInfo = useRef();

  //AUTH METHODS

  const googleAuth = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res) {
        //const credentials = GoogleAuthProvider.credentialFromResult(res);
        //const additionalUserInfo = getAdditionalUserInfo(res);
        //const token = credentials.accessToken;
        const user = res.user;
        return user;
      }
    } catch (err) {
      return err;
    }
  };

  const logout = async () => {
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return;
  }, []);

  const value = {
    currentUser,
    googleAuth,
    logout,
    loading,
    userInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
