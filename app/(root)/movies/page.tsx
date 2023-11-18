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

const Movie = () => {
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [action, animation, comedy, crime, documentary, drama, family, war] = await Promise.all([
          getMoviesByGenre("movie", "28"),
          getMoviesByGenre("movie", "16"),
          getMoviesByGenre("movie", "35"),
          getMoviesByGenre("movie", "80"),
          getMoviesByGenre("movie", "99"),
          getMoviesByGenre("movie", "18"),
          getMoviesByGenre("movie", "10751"),
          getMoviesByGenre("movie", "10752"),
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
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({ ...movie, type: "movie", addToFavorite: false })),
        }));

        setMoviesData(allResults);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoader(false);
      }
    };

    getAllMovies();
  }, [setPageLoader]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common moviesData={moviesData} />;
};

export default Movie;
