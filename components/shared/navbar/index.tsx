"use client";

import { menuItems } from "@/constants";
import { MenuItemProps } from "@/types";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGlobalContext } from "@/context";
import { signOut } from "next-auth/react";
import { useState } from "react";
import SearchBar from "./search-bar";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const { account, setAccount } = useGlobalContext();

  const logout = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  };
  return (
    <div className="relative">
      <header className="header h-[10vh] hover:bg-black transition-colors duration-300">
        <div className="flex items-center h-full space-x-2 md:space-x-12">
          <Image
            width={120}
            height={120}
            src={"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
          />

          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((menu: MenuItemProps) => {
              return (
                <li
                  className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#3b3b3b]"
                  key={menu.path}
                >
                  {menu.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="font-light flex items-center space-x-4 text-sm">
          {showSearchBar ? (
            <SearchBar setShowSearchBar={setShowSearchBar} />
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar((prev) => !prev)}
              className="hidden sm:inline sm:w-7 sm:h-7 cursor-pointer"
            />
          )}

          <Popover>
            <PopoverTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={
                    "https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                  }
                  alt="Current Profile"
                  className="max-w-[30px] min-w-[20px] max-h-[30px] min-h-[20px] w-[30px] h-[30px] object-cover rounded"
                />
                <p className="text-white">{account && account.name}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <button
                onClick={logout}
                className="text-center w-full h-[56px] text-sm font-light hover:bg-slate-800 rounded-md py-2 border border-white/40"
              >
                Sign out of Netflix
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
