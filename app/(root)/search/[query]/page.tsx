"use client";

import { MovieProps } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import { getSearchResult } from "@/lib/api";
import Login from "@/components/shared/login";
import Loader from "@/components/shared/loader";
import Navbar from "@/components/shared/navbar";
import MovieItem from "@/components/shared/movie/movie-item";
import ManageAccount from "@/components/shared/manage-account";

const Page = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { data: session }: any = useSession();
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const [tv, movies] = await Promise.all([getSearchResult("tv", params.query as string), getSearchResult("movie", params.query as string)]);
        const tvShows = tv.filter((item: MovieProps) => item.backdrop_path !== null && item.poster_path !== null).map((movie: MovieProps) => ({ ...movie, type: "tv" }));
        const moviesShow = movies.filter((item: MovieProps) => item.backdrop_path !== null && item.poster_path !== null).map((movie: MovieProps) => ({ ...movie, type: "movie" }));
        setMovies([...tvShows, ...moviesShow]);
      } catch (e) {
        return toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
      } finally {
        setPageLoader(false);
      }
    };
    getData();
  }, [params.query, setPageLoader]);
  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Navbar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">Showing Results for {decodeURI(params.query as string)}</h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">{movies && movies.length ? movies.map((movie, index) => <MovieItem key={index} movie={movie} />) : null}</div>
      </div>
    </motion.div>
  );
};

export default Page;
