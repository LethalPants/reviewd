import { createSelector } from 'reselect';

const selectReview = state => state.review;

export const selectHighRatedGame = createSelector([selectReview], review =>
  review.review ? review.review[0] : null
);

export const selectTenReview = createSelector([selectReview], review =>
  review.review ? review.review.slice(1, 10) : null
);

// export const selectCurrentUserType = createSelector([selectCurrentUser], user =>
//   user ? user.type : null
// );
