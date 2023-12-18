"use client";
import { MovieDataProps } from "@/types";
import Navbar from "./navbar";
import Banner from "./banner";
import MovieRow from "./movie/movie-row";
const Common = ({ moviesData }: { moviesData: MovieDataProps[] }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="relative pl-4 pb-24 lg:space-y-24">
        <Banner movies={moviesData && moviesData[0].data} />
        <section className="md:space-y-16">{moviesData && moviesData.map((item, index) => <MovieRow key={index} title={item.title} data={item.data} />)}</section>
      </div>
    </main>
  );
};

export default Common;
