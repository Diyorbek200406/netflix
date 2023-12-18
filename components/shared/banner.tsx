"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { useGlobalContext } from "@/context";
import { MovieProps } from "@/types";

const Banner = ({ movies }: { movies: MovieProps[] }) => {
  const [randomMovie, setRandomMovie] = useState<MovieProps | null>(null);
  const { account, setOpen, setMovie } = useGlobalContext();
  useEffect(() => {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    setRandomMovie(movie);
  }, [movies]);
  const onHandlerPopup = () => {
    setMovie(randomMovie);
    setOpen(true);
  };
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
      <div className="absolute top-0 left-0 h-[100vh] w-full -z-10">
        <Image src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_UR}/${randomMovie?.backdrop_path || randomMovie?.poster_path}`} alt={randomMovie?.name as string} fill objectFit="cover" />
        <div className="absolute w-full h-56 bg-gradient-to-t from-white to-transparent bottom-0 z-20" />
        <div className="absolute w-full h-full bg-gradient-to-r from-slate-800 to-transparent bottom-0 z-20" />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl line-clamp-1">{randomMovie?.name || randomMovie?.title || randomMovie?.original_name}</h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl line-clamp-3">{randomMovie?.overview}</p>
      <div className="flex space-x-3">
        <button onClick={onHandlerPopup} className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 bg-white hover:text-black md:text-xl md:px-8 md:py-2.5 text-black">
          <AiFillPlayCircle className="md:w-7 md:h-7 w-4 h4 cursor-pointer text-black" /> Play
        </button>
        <button onClick={onHandlerPopup} className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 bg-white hover:text-black md:text-xl md:px-8 md:py-2.5 text-black">
          <IoMdInformationCircle className="md:w-7 md:h-7 w-4 h4 cursor-pointer text-black" /> More Info
        </button>
      </div>
    </div>
  );
};
export default Banner;
