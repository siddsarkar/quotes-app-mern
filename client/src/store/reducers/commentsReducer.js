import * as actionTypes from "../actions/actionTypes";

const initialState = {
  comments: [],
  allComments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOT_COMMENTS_FOR_ARTICLE:
      return {
        ...state,
        comments: action.comments,
      };
    case actionTypes.GOT_ALL_COMMENTS:
      return {
        ...state,
        allComments: action.allComments,
      };
    default:
      return state;
  }
};

export default reducer;
