import { createSelector } from '@ngrx/store';
import * as fromAuth from './auth-state/auth.reducer';

export const getError = createSelector(
  fromAuth.getAuthState,
  (state: fromAuth.authState) => state.error
);

export const getAuth = createSelector(
  fromAuth.getAuthState,
  (state: fromAuth.authState) => state.auth
);
