"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AccountProps, ChildrenProps, GlobalContextType } from "@/types";

export const Context = createContext<GlobalContextType | null>(null);

const GlobalContext = ({ children }: ChildrenProps) => {
  const [account, setAccount] = useState<AccountProps | null>(null);
  const [pageLoader, setPageLoader] = useState<boolean>(true);

  useEffect(() => {
    setAccount(JSON.parse(sessionStorage.getItem("account") as string));
  }, []);

  return <Context.Provider value={{ account, setAccount, pageLoader, setPageLoader }}>{children}</Context.Provider>;
};

export default GlobalContext;

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useGlobalContext must be used within a GlobalContext");
  }
  return context;
};
