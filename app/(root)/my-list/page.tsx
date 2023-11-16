"use client";

import Loader from "@/components/shared/loader";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import MovieItem from "@/components/shared/movie/movie-item";
import Navbar from "@/components/shared/navbar";
import { toast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/context";
import { getFavourites } from "@/lib/api";
import { FavouriteProps, MovieProps } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page = () => {
  const [favourites, setFavourites] = useState<FavouriteProps[]>([]);

  const { data: session }: any = useSession();
  const { account, setPageLoader, pageLoader } = useGlobalContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getFavourites(session?.user?.uid, account?._id);
        setFavourites(data);
      } catch (error) {
        return toast({
          title: "Error",
          description: "Something went wrong , please try again",
          variant: "destructive",
        });
      } finally {
        setPageLoader(false);
      }
    };

    if (session && account) {
      getData();
    }
  }, [session, account]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <div className="md:px-12 px-4">
        {favourites && favourites.length === 0 ? (
          <div className="mt-[12vh] ml-14">not found</div>
        ) : (
          <div className="h-40 space-y-1 md:space-x-2 px-4 mt-[12vh]">
            <h2 className="text-sm font-semibold cursor-pointer text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
              My List
            </h2>

            <div className="group relative md:ml-2 pb-12">
              <div className="grid grid-cols-5 gap-4">
                {favourites &&
                  favourites.map((movie: FavouriteProps, index) => (
                    <MovieItem
                      key={index}
                      movie={
                        {
                          backdrop_path: movie?.backdrop_path,
                          poster_path: movie?.poster_path,
                          id: +movie?.movieId,
                          type: movie?.type,
                          title: movie?.title,
                          overview: movie?.overview,
                        } as MovieProps
                      }
                      favouriteId={movie._id}
                      setFavourites={setFavourites}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
