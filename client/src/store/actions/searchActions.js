import * as actionTypes from "./actionTypes";

export const getArticleBySearch = (query, page, cb) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GETTING_SEARCHED_ARTICLES });
    fetch("/api/articles/search?q=" + query + "&p=" + page, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: actionTypes.GOT_SEARCHED_ARTICLES,
          articles: res.posts,
          pages: res.pageCount,
        });
        cb();
      });
  };
};
export const getArticleByTags = (tag, page, cb) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GETTING_SEARCHED_ARTICLES });
    fetch("/api/articles/tags?t=" + tag + "&p=" + page, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: actionTypes.GOT_TAGGED_ARTICLES,
          articles: res.posts,
          pages: res.pageCount,
        });
        cb();
      });
  };
};
