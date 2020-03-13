import UserActionTypes from './user.types';

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        user: null
      };
    default:
      return state;
  }
};

export default userReducer;
