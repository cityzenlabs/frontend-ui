// authReducer.js

import { LOGIN, LOGOUT } from "../Actions/actionTypes";
import { Action } from "redux";

const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
