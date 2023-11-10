import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  setShowSearchBar: Dispatch<SetStateAction<boolean>>;
}

const SearchBar = ({ setShowSearchBar }: Props) => {
  return (
    <div className="hidden md:flex justify-center items-center text-center">
      <div className="bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%,100%,0.5)] rounded-md flex items-center text-center">
        <div className="order-2">
          <input
            placeholder="Search Movies, Tv and Dramas"
            className="w-[222px] bg-transparent outline-none border-none text-[14px] font-medium h-[34px] py-2 placeholder:text-[14px] font-md text-white"
          />
        </div>

        <button className="px-2">
          <AiOutlineSearch
            onClick={() => setShowSearchBar((prev) => !prev)}
            className="hidden sm:inline cursor-pointer sm:w-7 sm:h-7"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
