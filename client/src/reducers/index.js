import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import  getUserInfo  from "./getUserInfo";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  getUserInfo: getUserInfo,
});

export default allReducers;
