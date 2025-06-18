import {
  GET_KEYWORD,
  GET_MOVIE_DETAIL,
  GET_MOVIE_POPULAR_LIST,
  GET_PAGE,
  IS_LOADING_DETAIL,
  IS_LOADING_MOVIE_POPULAR_LIST,
  IS_SEARCH,
  SEARCH_MOVIE,
} from "../../../constant";

const initialState = {
  dataMoviePopular: [],
  isLoadingPopularMovie: false,
  dataDetailMovie: {},
  isLoadingDetail: false,
  dataSearchMovie: [],
  page: 1,
  isSearch: false,
  keyword: ''
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
    case GET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case IS_SEARCH:
      return {
        ...state,
        isSearch: action.payload,
      };
    case GET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };

    default:
      return state;
  }
};

export default movieReducers;
