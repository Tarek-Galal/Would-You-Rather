import { combineReducers } from "redux";
import { usersReducer, questionsReducer, loggedInUserReducer } from "./reducer";
import { loadingBarReducer } from "react-redux-loading-bar";

const mainReducer = combineReducers({
  users: usersReducer,
  questions: questionsReducer,
  loggedInUser: loggedInUserReducer,
  loadingBar: loadingBarReducer,
});

export default mainReducer;
