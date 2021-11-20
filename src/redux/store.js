import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import mainReducer from "./mainReducer";

const middlewares = [loadingBarMiddleware(), thunk, logger];
const store = createStore(mainReducer, applyMiddleware(...middlewares));
export default store;
