import ReviewActionTypes from './review.types';

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReviewActionTypes.UPDATE_REVIEWS:
      return {
        ...state.review,
        review: action.payload
      };
    // case UPReviewActionTypes.SIGN_IN_SUCCESS:
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    // case UPReviewActionTypes.SIGN_OUT_SUCCESS:
    //   return {
    //     user: null
    //   };
    default:
      return state;
  }
};

export default userReducer;
