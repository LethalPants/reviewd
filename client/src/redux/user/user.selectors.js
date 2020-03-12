import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector([user], user => user);
