import { createSelector } from '@ngrx/store';
import * as fromUser from './user-state/user.reducer';
import { getUsersState } from './user-state/user.reducer';

export const getUser = createSelector(
  getUsersState,
  (state: fromUser.usersState) => state.user
);

export const getLoading = createSelector(
  getUsersState,
  (state: fromUser.usersState) => state.loading
);
