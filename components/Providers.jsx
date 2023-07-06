"use client";
import { AuthProvider } from "@/firebase/context/AuthContext";
//import { useEffect, useState } from "react";

const Providers = ({ children }) => {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
