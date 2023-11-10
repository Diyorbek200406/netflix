import { usePathname } from "next/navigation";
import { usePathname } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface GlobalContextType {
  account: AccountProps | null;
  setAccount: Dispatch<SetStateAction<AccountProps | null>>;
  pageLoader: boolean;
  setPageLoader: Dispatch<SetStateAction<boolean>>;
}

export interface AccountProps {
  _id: string;
  uid: string;
  name: string;
  pin: string;
}

export interface AxiosResponse {
  success: boolean;
  message?: string;
}

export interface AccountResponse extends AxiosResponse {
  data: AccountProps[] | AccountProps;
}

export interface MenuItemProps {
  id: string;
  name: string;
  path: string;
}
