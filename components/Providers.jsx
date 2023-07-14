"use client";
import { AuthProvider } from "@/firebase/context/AuthContext";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
//import { useEffect, useState } from "react";

const Providers = ({ children }) => {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default Providers;
