import jwt from "jsonwebtoken";
import * as actionTypes from "./actionTypes";

const options = (data) => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(data),
  };
};

export const userSignUpRequest = (data, cb) => {
  return (dispatch) => {
    return fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message + "! Please Click Login");
        cb();
      });
  };
};

export const userLoginRequest = (userLoginDetails, callback) => {
  return (dispatch) => {
    return fetch("/api/users/login", options(userLoginDetails))
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert("Wrong username or password!");
          callback();
        }
      })
      .then((res) => {
        if (res) {
          alert(res.message);
          const token = res.token;
          delete res.token;
          localStorage.setItem("jwtToken", token);
          dispatch({
            type: actionTypes.USER_LOGGED_IN,
            authorizationToken: token,
            authenticatedUsername: jwt.decode(token).username,
          });
          callback();
          return res;
        }
      });
  };
};

export const userLogoutRequest = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch({ type: actionTypes.USER_LOGGED_OUT });
  alert("Succesfully Logged Out!");
};
