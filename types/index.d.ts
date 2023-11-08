import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface GlobalContextType {
  account: AccountProps | null;
  setAccount: Dispatch<SetStateAction<AccountProps | null>>;
}

export interface AccountProps {
  _id: string;
  uid: string;
  name: string;
  pin: string;
}
