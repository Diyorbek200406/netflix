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

export const getMoviesByGenre = async (type: string, id: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`);
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async (type?: string, id?: number) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`);
    return { data, type };
  } catch (e) {
    console.log(e);
  }
};

export const getSimilarMovies = async (type?: string, id?: number) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`);
    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getFavourites = async (uid?: string, accountId?: string) => {
  try {
    const { data } = await axios.get(`/api/favourite?uid=${uid}&accountId=${accountId}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getSearchResult = async (type: string, query: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}`);
    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};
