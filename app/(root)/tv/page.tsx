"use client";

import Common from "@/components/shared/common";
import Loader from "@/components/shared/loader";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import { useGlobalContext } from "@/context";
import { getMoviesByGenre } from "@/lib/api";
import { MovieDataProps, MovieProps } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Tv = () => {
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [action, animation, comedy, crime, documentary, drama, family, war] = await Promise.all([
          getMoviesByGenre("tv", "10759"),
          getMoviesByGenre("tv", "16"),
          getMoviesByGenre("tv", "35"),
          getMoviesByGenre("tv", "80"),
          getMoviesByGenre("tv", "99"),
          getMoviesByGenre("tv", "18"),
          getMoviesByGenre("tv", "10751"),
          getMoviesByGenre("tv", "10768"),
        ]);

        const allResults: MovieDataProps[] = [
          { title: "Action", data: action },
          { title: "Animation", data: animation },
          { title: "Comedy", data: comedy },
          { title: "Crime", data: crime },
          { title: "Documentary", data: documentary },
          { title: "Drama", data: drama },
          { title: "Family", data: family },
          { title: "War", data: war },
        ].map((item) => ({ ...item, data: item.data.map((movie: MovieProps) => ({ ...movie, type: "tv", addToFavorite: false })) }));

        setMoviesData(allResults);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoader(false);
      }
    };

    getAllMovies();
  }, []);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common moviesData={moviesData} />;
};

export default Tv;