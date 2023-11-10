"use client";

import { MovieProps } from "@/types";
import MovieItem from "./movie-item";

interface Props {
  title: string;
  data: MovieProps[];
}

const MovieRow = ({ title, data }: Props) => {
  return (
    <div className="h-40 space-y-1 md:space-x-2 px-4">
      <h2 className="text-sm font-semibold cursor-pointer text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className="group relative md:ml-2">
        <div className="flex items-center scrollbar-hide space-x-1 overflow-x-scroll md:space-x-3 md:p-2">
          {data
            .filter((movie) => movie.backdrop_path !== null && movie.poster_path !== null)
            .map((movie, index) => (
              <MovieItem key={index} movie={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
