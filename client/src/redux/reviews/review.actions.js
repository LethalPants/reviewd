import ReviewActionTypes from './review.types';
import axios from 'axios';

export const loadReviews = () => {
  return dispatch => {
    return axios.get('/api/reviews').then(res => {
      if (res.status === 200) dispatch(updateReviews(res.data));
    });
  };
};

export const updateReviews = reviews => ({
  type: ReviewActionTypes.UPDATE_REVIEWS,
  payload: reviews
});

// export const signOutSuccess = () => ({
//   type: ReviewActionTypes.SIGN_OUT_SUCCESS
// });

// export const signUpSuccess = user => {
//   return {
//     type: ReviewActionTypes.SIGN_UP_SUCCESS,
//     payload: user
//   };
// };
