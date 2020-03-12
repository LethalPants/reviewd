import UserActionTypes from './user.types';

const INITIAL_STATE = {
  user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        user: action.payload
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        user: action.payload
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default userReducer;
