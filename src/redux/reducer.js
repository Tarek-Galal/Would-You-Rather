import {
  FETCH_USERS,
  FETCH_QUESTIONS,
  LOGIN_USER,
  LOGOUT_USER,
} from "./actionTypes";

import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export const mainReducer = combineReducers({
  users: usersReducer,
  questions: questionsReducer,
  loggedInUser: loggedInUserReducer,
  loadingBar: loadingBarReducer,
});
