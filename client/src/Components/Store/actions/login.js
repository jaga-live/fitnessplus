import { axiosInstance } from "../../Utility/axiosInstance";
import * as actionTypes from "./actionTypes";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};
export const loginSuccess = (token, logo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token,
    logo,
  };
};
export const loginFailure = () => {
  return {
    type: actionTypes.LOGIN_FAILURE,
  };
};
export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthStatus = (token) => {
  return (dispatch) => {
    if (token === null || token === undefined) {
      return dispatch(loginFailure());
    }
    axiosInstance
      .post("/checkauthstatus", token)
      .then((res) => {
        dispatch(loginSuccess(token, res.data.logo));
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };
};
