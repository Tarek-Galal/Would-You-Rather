import * as API from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  FETCH_USERS,
  FETCH_QUESTIONS,
  SAVE_NEW_QUESTION,
  SAVE_QUESTION_ANSWER,
  LOGIN_USER,
  LOGOUT_USER,
} from "./actionTypes";

export const getUsersSuccess = (users) => ({
  type: FETCH_USERS,
  payload: users,
});

export const getUsers = () => async (dispatch) => {
  dispatch(showLoading());
  const users = await API._getUsers();
  dispatch(getUsersSuccess(users));
  dispatch(hideLoading());
};

export const getQuestions = (questions) => ({
  type: FETCH_QUESTIONS,
  payload: questions,
});

export const fetchQuestions = () => async (dispatch) => {
  dispatch(showLoading());

  const questions = await API._getQuestions();
  dispatch(getQuestions(questions));
  dispatch(hideLoading());
};

export const saveNewQuestionSuccess = () => ({
  type: SAVE_NEW_QUESTION,
});

export const saveNewQuestion =
  (optionOneText, optionTwoText) => async (dispatch, getState) => {
    dispatch(showLoading);
    await API._saveQuestion({
      optionOneText,
      optionTwoText,
      author: getState().loggedInUser.id,
    });

    dispatch(saveNewQuestionSuccess());
    dispatch(hideLoading());
    dispatch(fetchQuestions());
  };

const saveQuestionAnswerSuccess = () => ({
  type: SAVE_QUESTION_ANSWER,
});

export const saveQuestionAnswer =
  (qid, answer) => async (dispatch, getState) => {
    dispatch(showLoading());
    const userID = getState().loggedInUser.id;
    await API._saveQuestionAnswer({
      authedUser: userID,
      qid,
      answer,
    });
    dispatch(saveQuestionAnswerSuccess());
    dispatch(hideLoading());
    dispatch(getUsers());
    dispatch(fetchQuestions());
  };

export const setLoggedInUserSuccess = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const setLoggedInUser = (userID) => (dispatch, getState) => {
  const user = getState().users[userID];
  dispatch(setLoggedInUserSuccess(user));
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
