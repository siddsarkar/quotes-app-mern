import * as actionTypes from "./actionTypes";

// const getAllComments
export const getCommentsForArticle = (articleId) => {
  return (dispatch) => {
    fetch("/api/comments/get/" + articleId, {
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
          type: actionTypes.GOT_COMMENTS_FOR_ARTICLE,
          comments: res,
        });
        console.log(res);
      });
  };
};
