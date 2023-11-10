import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY as string;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL as string;

export const getTrandingMovies = async (type: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=en-US`);
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTopRatedMovies = async (type: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`);
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = async (type: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};
