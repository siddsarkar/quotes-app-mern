import * as actionTypes from "./actionTypes";

export const getAllArticles = () => {
  return (dispatch) => {
    fetch("/articles", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: actionTypes.GOT_ALL_ARTICLES, articles: res })
      );
  };
};

export const getMyArticles = () => {
  return (dispatch) => {
    fetch("/articles/myarticles", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.articles);
        dispatch({
          type: actionTypes.GOT_MY_ARTICLES,
          myArticles: res.articles,
        });
      });
  };
};

export const addArticle = (article) => {
  return (dispatch) => {
    return fetch("/articles/add", {
      method: "POST",
      body: JSON.stringify(article),
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
export const updateArticle = (articleId, updatedArticle) => {
  return (dispatch) => {
    return fetch("/articles/edit" + articleId, {
      method: "POST",
      body: JSON.stringify(updatedArticle),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
  };
};

export const deleteArticle = (articleId) => {
  return (dispatch) => {
    return fetch("/articles/delete/" + articleId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => res.json());
  };
};
