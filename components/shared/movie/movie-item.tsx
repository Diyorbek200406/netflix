"use client";
import { FavouriteProps, MovieProps } from "@/types";
import { motion } from "framer-motion";
import { ChevronDown, Loader2, MinusIcon, PlusIcon } from "lucide-react";
import { useGlobalContext } from "@/context";
import CustomImage from "../custom-image";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Props {
  movie: MovieProps;
  favouriteId?: string;
  setFavourites?: React.Dispatch<React.SetStateAction<FavouriteProps[]>>;
}

const MovieItem = ({ movie, favouriteId = "", setFavourites }: Props) => {
  const { setOpen, setMovie, account } = useGlobalContext();
  const { data: session }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const onHandlerPopup = () => {
    setMovie(movie);
    setOpen(true);
  };

  const onAdd = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/favourite", {
        uid: session?.user?.uid,
        accountId: account?._id,
        backdrop_path: movie?.backdrop_path,
        poster_path: movie?.poster_path,
        movieId: movie?.id,
        type: movie?.type,
        title: movie?.title,
        overview: movie?.overview,
      });

      if (data.success) {
        return toast({
          title: "Success",
          description: "The movie has been added to your account",
        });
      } else {
        return toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
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

  const onRemove = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/api/favourite?id=${favouriteId}`);

      if (data?.success) {
        if (setFavourites) {
          setFavourites((prev) => prev.filter((favourite) => favourite._id !== favouriteId));
        }
        return toast({
          title: "Success",
          description: "The movie has been removed from your account",
        });
      } else {
        return toast({
          title: "Success",
          description: "The movie has been removed from your account",
        });
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <div className="relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[999]">
        <CustomImage
          className="rounded-sm object-cover md:rounded hover:rounded-sm"
          image={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_UR}/${movie?.backdrop_path || movie?.poster_path}`}
          alt="Image"
          onClick={onHandlerPopup}
        />

        <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
          <button className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black">
            {isLoading ? (
              <Loader2 className="w-7 h-7 animate-spin text-red-600" />
            ) : favouriteId?.length ? (
              <MinusIcon onClick={onRemove} color="#fff" className="w-7 h-7" />
            ) : (
              <PlusIcon onClick={onAdd} color="#fff" className="w-7 h-7" />
            )}
          </button>
          <button className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black">
            <ChevronDown color="#fff" className="w-7 h-7" onClick={onHandlerPopup} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieItem;
