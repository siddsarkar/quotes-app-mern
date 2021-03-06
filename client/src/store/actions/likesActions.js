import * as actionTypes from "./actionTypes";

//* POST

export const likeArticle = (articleId, cb) => {
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
      .then((res) => {
        // alert(res.message);
        cb();
      });
  };
};

//* GET

export const getLikesForArticle = (articleId, cb) => {
  return (dispatch) => {
    fetch("/api/likes/get/" + articleId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: actionTypes.GOT_LIKES_FOR_ARTICLE,
          likes: res.likes,
          isLiked: res.isLiked,
        });
        cb();
      });
  };
};

export const getMyLikes = (cb) => {
  return (dispatch) => {
    fetch("/api/likes/mylikes", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: actionTypes.GOT_MY_LIKES, myLikes: res });
        cb();
      });
  };
};
