import * as actionTypes from "../actions/actionTypes";

const initialState = {
  articles: [],
  pages: 0,
  fetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_SEARCHED_ARTICLES:
      return {
        ...state,
        fetching: true,
      };
    case actionTypes.GOT_SEARCHED_ARTICLES:
      return {
        ...state,
        articles: action.articles,
        pages: action.pages,
        fetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
