import {
  GET_MOVIE_DETAIL,
  GET_MOVIE_POPULAR_LIST,
  IS_LOADING_DETAIL,
  IS_LOADING_MOVIE_POPULAR_LIST,
  SEARCH_MOVIE,
} from "../../../constant";

const initialState = {
  dataMoviePopular: [],
  isLoadingPopularMovie: false,
  dataDetailMovie: {},
  isLoadingDetail: false,
  dataSearchMovie: [],
};

const movieReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_POPULAR_LIST:
      return {
        ...state,
        dataMoviePopular: action.payload.data,
        isLoadingPopularMovie: action.payload.isLoading,
      };
    case IS_LOADING_MOVIE_POPULAR_LIST:
      return {
        ...state,
        isLoadingPopularMovie: action.payload.isLoading,
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        isLoadingDetail: action.payload.isLoading,
        dataDetailMovie: action.payload.data,
      };
    case IS_LOADING_DETAIL:
      return {
        ...state,
        isLoadingDetail: action.payload.isLoading,
      };
    case SEARCH_MOVIE:
      return {
        ...state,
        dataSearchMovie: action.payload.data,
        isLoadingMoviePopular: action.payload.isLoading,
      };

    default:
      return state;
  }
};

export default movieReducers;
