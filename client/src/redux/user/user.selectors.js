import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.user
);

export const selectCurrentUserType = createSelector([selectCurrentUser], user =>
  user ? user.type : null
);
