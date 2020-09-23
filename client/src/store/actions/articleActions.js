import * as actionTypes from "./actionTypes";

export const getAllArticles = (callback) => {
  return (dispatch) => {
    fetch("/api/articles", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: actionTypes.GOT_ALL_ARTICLES, articles: res });
        callback();
      });
  };
};
export const getSingleArticle = (id, callback) => {
  return (dispatch) => {
    fetch("/api/articles/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: actionTypes.GOT_SINGLE_ARTICLE, article: res });
        callback();
      });
  };
};

export const getArticleByAuthor = (authorid, cb) => {
  return (dispatch) => {
    fetch("/api/articles/" + authorid + "/articles", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(({ articles }) => {
        dispatch({ type: actionTypes.GOT_ALL_ARTICLES, articles: articles });
        cb();
      });
  };
};

export const getMyArticles = (cb) => {
  return (dispatch) => {
    fetch("/api/articles/myarticles", {
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
          type: actionTypes.GOT_MY_ARTICLES,
          myArticles: res.articles,
        });
        cb();
      });
  };
};

export const addArticle = (article, callback) => {
  return (dispatch) => {
    return fetch("/api/articles/add", {
      method: "POST",
      body: JSON.stringify(article),
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
export const updateArticle = (articleId, updatedArticle) => {
  return (dispatch) => {
    return fetch("/api/articles/edit/" + articleId, {
      method: "POST",
      body: JSON.stringify(updatedArticle),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => alert(res.success));
  };
};

export const deleteArticle = (articleId, callback) => {
  return (dispatch) => {
    return fetch("/api/articles/delete/" + articleId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.success);
        callback();
      });
  };
};
