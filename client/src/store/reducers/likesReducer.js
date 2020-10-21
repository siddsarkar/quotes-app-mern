import * as actionTypes from "../actions/actionTypes";

const initialState = {
  likes: [],
  myLikes: [],
  isLiked: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOT_LIKES_FOR_ARTICLE:
      return {
        ...state,
        likes: action.likes,
        isLiked: action.isLiked,
      };
    case actionTypes.GOT_MY_LIKES:
      return {
        ...state,
        myLikes: action.myLikes,
      };
    default:
      return state;
  }
};

export default reducer;
