"use client";

import { menuItems } from "@/constants";
import { AccountProps, AccountResponse, MenuItemProps } from "@/types";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGlobalContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MoviePopup from "../movie/movie-popup";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { account, setAccount, setPageLoader } = useGlobalContext();
  const { data: session }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    const GetAllAccounts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<AccountResponse>(`/api/account?uid=${session.user.uid}`);
        if (data.success) {
          setAccounts(data?.data as AccountProps[]);
        }
      } catch (error) {
        return toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    GetAllAccounts();

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  };
  return (
    <div className="relative">
      <header
        className={cn(
          "header h-[10vh] hover:bg-black transition-colors duration-400 z-[9999] ease-in-out",
          isScrolled ? "bg-black" : "bg-transparent"
        )}
      >
        <div className="flex items-center h-full space-x-2 md:space-x-12">
          <Image
            width={120}
            height={120}
            src={"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
          />

          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((menu: MenuItemProps, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    router.push(menu.path);
                    setPageLoader(true);
                  }}
                  className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#3b3b3b]"
                >
                  {menu.name}
                </li>
              );
            })}
          </ul>
        </div>

        <MoviePopup />

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
            <PopoverContent className="mt-[20px]">
              {isLoading ? (
                <div className="flex flex-col space-y-4">
                  {[1, 2].map((item, index) => (
                    <Skeleton key={index} className="w-full h-14" />
                  ))}
                </div>
              ) : (
                accounts &&
                accounts.map((account, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setAccount(null);
                      sessionStorage.removeItem("account");
                    }}
                    className="cursor-pointer flex h-14 gap-3 hover:bg-slate-800 rounded-md items-center px-4 py-2"
                  >
                    <img
                      src={
                        "https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                      }
                      alt="Current Profile"
                      className="max-w-[30px] min-w-[20px] max-h-[30px] min-h-[20px] w-[30px] h-[30px] object-cover rounded"
                    />
                    <p className="text-white">{account && account.name}</p>
                  </div>
                ))
              )}

              <button
                onClick={logout}
                className={cn(
                  "text-center w-full h-[56px] text-sm font-light hover:bg-slate-800 rounded-md py-2 border border-white/40",
                  !isLoading && "mt-4"
                )}
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
