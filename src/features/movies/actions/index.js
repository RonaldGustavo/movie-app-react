import {
  GET_MOVIE_NOWPLAYING_LIST,
  IS_LOADING_MOVIE_NOWPLAYING_LIST,
} from "../../../constant";
import { getDataMovieNowPlayingService } from "../services";

export const getDataMovieNowPlayingAction = () => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING_MOVIE_NOWPLAYING_LIST,
      payload: {
        isLoading: true,
      },
    });
    try {
      const data = await getDataMovieNowPlayingService();
      dispatch({
        type: GET_MOVIE_NOWPLAYING_LIST,
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
