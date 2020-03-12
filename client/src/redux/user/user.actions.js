import UserActionTypes from './user.types';

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signUpSuccess = user => {
  return {
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: user
  };
};
