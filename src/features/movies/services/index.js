import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = process.env.REACT_APP_BASE_URL

export const getDataMovieNowPlayingService = async (page) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page || 1}`
    );

    const data = await result.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDataDetailMovieService = async (idMovie) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/movie/${idMovie}?api_key=${API_KEY}`
    );
    const data = await result.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const searchMovieService = async (keyword, page) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword || ''}&page=${page || 1}`
    );
    const data = await result.data;
    return data;
  } catch (error) {
    throw error;
  }
};
