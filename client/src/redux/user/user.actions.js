/*eslint no-useless-computed-key: "off"*/

import UserActionTypes from './user.types';
import axios from 'axios';

export const logout = () => {
  return dispatch => {
    return axios({
      method: 'POST',
      url: '/api/users/logout',
      headers: { ['Authorization']: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        dispatch(signOutSuccess());
        localStorage.clear();
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

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
