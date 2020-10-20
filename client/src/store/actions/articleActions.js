import * as actionTypes from "./actionTypes";

//? Helpers

const postOptions = (arg) => ({
  method: "POST",
  body: JSON.stringify(arg),
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//* POST

export const addArticle = (article, callback) => {
  return (dispatch) => {
    return fetch("/api/articles/add", postOptions(article))
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        callback();
      });
  };
};
export const updateArticle = (articleId, updatedArticle) => {
  return (dispatch) => {
    return fetch("/api/articles/edit/" + articleId, postOptions(updatedArticle))
      .then((res) => res.json())
      .then((res) => alert(res.success));
  };
};

//* GET

export const getAllArticles = (callback, data) => {
  return (dispatch) => {
    fetch("/api/articles?sort_by=" + data.sort_by + "&p=" + data.page, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: actionTypes.GOT_ALL_ARTICLES,
          articles: res.posts,
          pages: res.pageCount,
        });
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
      .then((res) => {
        if (res.status === 401) {
          dispatch({ type: actionTypes.USER_LOGGED_OUT });
          alert("session expired please login again!");
          return false;
        } else {
          return res.json();
        }
      })
      .then((res) => {
        res &&
          dispatch({
            type: actionTypes.GOT_MY_ARTICLES,
            myArticles: res.articles,
          });
        cb();
      });
  };
};

//* DELETE

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

//del

export const clearArticles = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_ARTICLES,
    });
  };
};
