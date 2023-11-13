import axios from "axios";

export const getDataMovieNowPlayingService = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
    );

    const data = await result.data.results;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDataDetailMovieService = async (idMovie) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/movie/${idMovie}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await result.data;
    return data;
  } catch (error) {
    throw error;
  }
};
