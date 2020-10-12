import * as actionTypes from "../actions/actionTypes";
import jwt from "jsonwebtoken";

const validCredentials = () => {
  const authorizationToken = localStorage.getItem("jwtToken");
  if (authorizationToken === null) return false;
  try {
    jwt.decode(authorizationToken);
    const { exp } = jwt.decode(authorizationToken);
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

const initialState = {
  isAuthenticated: validCredentials(),
  authenticatedUsername:
    validCredentials() === false
      ? ""
      : jwt.decode(localStorage.getItem("jwtToken")).username,
  userId:
    validCredentials() === false
      ? ""
      : jwt.decode(localStorage.getItem("jwtToken")).id,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGED_IN:
      return {
        isAuthenticated: true,
        authenticatedUsername: action.authenticatedUsername,
      };
    case actionTypes.USER_LOGGED_OUT:
      return {
        isAuthenticated: false,
        authenticatedUsername: "",
      };
    default:
      return state;
  }
};

export default reducer;
