import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  token: null,
  data: null,
};

const loginReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: actions.token,
        logo: actions.logo,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.LOGOUT:
      return {
        loading: false,
        token: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
