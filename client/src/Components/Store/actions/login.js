import * as actionTypes from "./actionTypes";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};
export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
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
