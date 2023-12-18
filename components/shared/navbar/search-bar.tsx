"use client";
import { useGlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, KeyboardEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
const SearchBar = ({ setShowSearchBar }: { setShowSearchBar: Dispatch<SetStateAction<boolean>> }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { pageLoader, setPageLoader } = useGlobalContext();
  const handleKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query && query.trim() !== "") {
      setPageLoader(true);
      if (pathname !== "/search") {
        router.replace(`/search/${query}`);
      } else {
        router.push(`/search/${query}`);
      }
    }
  };
  return (
    <div className="hidden md:flex justify-center items-center text-center">
      <div className="bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%,100%,0.5)] rounded-md flex items-center text-center">
        <div className="order-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyUp={handleKeySubmit} placeholder="Search Movies, Tv and Dramas" className="w-[222px] bg-transparent outline-none border-none text-[14px] font-medium h-[34px] py-2 placeholder:text-[14px] font-md text-white" />
        </div>
        <button className="px-2">
          <AiOutlineSearch onClick={() => setShowSearchBar((prev) => !prev)} className="hidden sm:inline cursor-pointer sm:w-7 sm:h-7" />
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
