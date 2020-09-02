import * as actionTypes from "../actions/actionTypes";

const initialState = {
  likes: 0,
  allLikes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOT_LIKES_FOR_ARTICLE:
      return {
        ...state,
        likes: action.likes,
      };
    case actionTypes.GOT_ALL_LIKES:
      return {
        ...state,
        allLikes: action.allLikes,
      };
    default:
      return state;
  }
};

export default reducer;
