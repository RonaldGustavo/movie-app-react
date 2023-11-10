import {
  GET_MOVIE_NOWPLAYING_LIST,
  IS_LOADING_MOVIE_NOWPLAYING_LIST,
} from "../../../constant";

const initialState = {
  dataMovieNowPlaying: [],
  isLoadingMovieNowPlaying: false,
};

const movieReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_NOWPLAYING_LIST:
      return {
        ...state,
        dataMovieNowPlaying: action.payload.data,
        isLoadingMovieNowPlaying: action.payload.isLoading,
      };
    case IS_LOADING_MOVIE_NOWPLAYING_LIST:
      return {
        ...state,
        isLoadingMovieNowPlaying: action.payload.isLoading,
      };
    default:
      return state;
  }
};

export default movieReducers;
