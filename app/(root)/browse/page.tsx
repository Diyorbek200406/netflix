"use client";

import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Loader from "@/components/shared/loader";
import Common from "@/components/shared/common";
import { getPopularMovies, getTopRatedMovies, getTrandingMovies } from "@/lib/api";
import { MovieDataProps, MovieProps } from "@/types";

const Page = () => {
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [trandingTv, topRatedTv, popularTv, trandingMovie, topRatedMovie, popularMovie] = await Promise.all([
          getTrandingMovies("tv"),
          getTopRatedMovies("tv"),
          getPopularMovies("tv"),
          getTrandingMovies("movie"),
          getTopRatedMovies("movie"),
          getPopularMovies("movie"),
        ]);

        const tvShows: MovieDataProps[] = [
          { title: "Tranding Tv Shows", data: trandingTv },
          { title: "Top Rated Tv Shows", data: topRatedTv },
          { title: "Popular Tv Shows", data: popularTv },
        ].map((item) => ({ ...item, data: item.data.map((movie: MovieProps) => ({ ...movie, type: "tv", addToFavorite: false })) }));

        const moviesShows: MovieDataProps[] = [
          { title: "Tranding Movies", data: trandingMovie },
          { title: "Top Rated Movies", data: topRatedMovie },
          { title: "Popular Movies", data: popularMovie },
        ].map((item) => ({ ...item, data: item.data.map((movie: MovieProps) => ({ ...movie, type: "movie", addToFavorite: false })) }));

        const allMovies = [...tvShows, ...moviesShows];

        setMoviesData(allMovies);
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

export default Page;
