import * as actionTypes from "./actionTypes";

// const getAllComments
export const getCommentsForArticle = (articleId) => {
  return (dispatch) => {
    fetch("/api/comments/get/" + articleId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: actionTypes.GOT_COMMENTS_FOR_ARTICLE,
          comments: res,
        });
        console.log(res);
      });
  };
};

export const addComment = (articleId, body, callback) => {
  return (dispatch) => {
    fetch("/api/comments/add/" + articleId, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        callback();
      });
  };
};

export const getMyComments = () => {
  return (dispatch) => {
    fetch("/api/comments/mycomments", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.GOT_MY_COMMENTS,
          myComments: res.mycomments,
        });
      });
  };
};

export const deleteComment = (commentId, callback) => {
  return (dispatch) => {
    fetch("/api/comments/delete/" + commentId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        callback();
      });
  };
};
