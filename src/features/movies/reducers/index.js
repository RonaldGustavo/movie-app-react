import { GET_MOVIE_LIST } from "../../../constant";

const initialState = {
  dataMovie: [],
};

const movieReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_LIST:
      return {
        ...state,
        dataMovie: action.payload.dataMovie,
      };
    default:
      return state;
  }
};

export default movieReducers;
