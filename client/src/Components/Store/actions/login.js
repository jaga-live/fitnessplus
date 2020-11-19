import { axiosInstance } from "../../Utility/axiosInstance";
import * as actionTypes from "./actionTypes";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};
export const changeLogo = (tag) => {
  return {
    type: actionTypes.CHANGE_LOGO,
    tag,
  };
};
export const loginSuccess = (token, logo, type) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token,
    logo,
    userType: type,
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
    dispatch(loginStart());
    if (token === null || token === undefined) {
      return dispatch(loginFailure());
    }
    axiosInstance
      .post("/checkauthstatus", token)
      .then((res) => {
        console.log(res.data);
        dispatch(loginSuccess(token, res.data.avatar, res.data.type));
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };
};
