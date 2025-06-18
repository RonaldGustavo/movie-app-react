import {
  GET_MOVIE_DETAIL,
  GET_MOVIE_POPULAR_LIST,
  IS_LOADING_DETAIL,
  IS_LOADING_MOVIE_POPULAR_LIST,
} from "../../../constant";
import {
  getDataDetailMovieService,
  getDataMovieNowPlayingService,
  searchMovieService,
} from "../services";

export const getDataMovieNowPlayingAction = (page) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING_MOVIE_POPULAR_LIST,
      payload: {
        isLoading: true,
      },
    });
    try {
      const data = await getDataMovieNowPlayingService(page);
      dispatch({
        type: GET_MOVIE_POPULAR_LIST,
        payload: {
          data: data,
          isLoading: false,
        },
      });
    } catch (error) {
      console.log("error action Get Movie Now Playing: ", error.message);
    }
  };
};

export const getDataDetailMovieAction = (idMovie) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING_DETAIL,
      payload: {
        isLoading: true,
      },
    });
    try {
      const data = await getDataDetailMovieService(idMovie);
      dispatch({
        type: GET_MOVIE_DETAIL,
        payload: {
          data: data,
          isLoading: false,
        },
      });
    } catch (error) {
      console.log("error action Get Movie Now Playing: ", error.message);
    }
  };
};

export const searchMovieAction = (keyword, page) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING_MOVIE_POPULAR_LIST,
      payload: {
        isLoading: true,
      },
    });
    try {
      const data = await searchMovieService(keyword, page);
      dispatch({
        type: GET_MOVIE_POPULAR_LIST,
        payload: {
          data: data,
          isLoading: false,
        },
      });
    } catch (error) {
      console.log("error action Get Movie Now Playing: ", error.message);
    }
  };
};
