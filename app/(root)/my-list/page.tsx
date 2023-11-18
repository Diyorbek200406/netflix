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
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const Page = () => {
  const [favourites, setFavourites] = useState<FavouriteProps[]>([]);

  const { data: session }: any = useSession();
  const { account, setPageLoader, pageLoader } = useGlobalContext();

  const router = useRouter();

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
          <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
              <div className="relative">
                <div className="">
                  <h1 className="my-2 text-gray-100 font-bold text-2xl">
                    Looks like you don't have any favourites yet!
                  </h1>
                  <p className="my-2 text-gray-300">
                    Sorry about that! Please visit our hompage to get where you need to go.
                  </p>
                  <button
                    className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                    onClick={() => {
                      setPageLoader(true);
                      router.push("/");
                    }}
                  >
                    Take me there!
                  </button>
                </div>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
          </div>
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
