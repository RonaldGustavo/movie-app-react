import { combineReducers } from "redux";
import movieReducers from "../../features/movies/reducers";

export default combineReducers({
  movies: movieReducers,
});
