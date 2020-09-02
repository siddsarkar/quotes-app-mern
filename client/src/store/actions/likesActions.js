import * as actionTypes from "./actionTypes";

export const getLikesForArticle = (articleId) => {
  return (dispatch) => {
    fetch("/api/likes/" + articleId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: actionTypes.GOT_LIKES_FOR_ARTICLE, likes: res });
        return res;
      });
  };
};

export const likeArticle = (articleId) => {
  return (dispatch) => {
    fetch("/api/likes/like/" + articleId, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
};

export const getAllLikes = (callback) => {
  return (dispatch) => {
    fetch("/api/likes/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: actionTypes.GOT_ALL_LIKES, allLikes: res });
        callback();
      });
  };
};
