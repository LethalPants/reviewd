import { createSelector } from 'reselect';

const selectReview = state => state.review;

export const selectHighRatedGame = createSelector([
  [selectReview],
  review => review.review[0]
]);

export const selectReviewsFromOne = createSelector([selectReview], review =>
  review.review.slice((1, review.length))
);

// export const selectCurrentUserType = createSelector([selectCurrentUser], user =>
//   user ? user.type : null
// );
