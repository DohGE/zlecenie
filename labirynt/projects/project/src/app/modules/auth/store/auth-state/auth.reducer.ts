import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Auth } from 'projects/project/src/app/shared/models/auth.model';
import * as authActions from './auth.actions';

export interface authState {
  error: string;
  auth: Auth | null;
}

export const authInitialState = {
  error: '',
  auth: null,
};

export const getAuthState = createFeatureSelector<authState>('auth');

export const authReducer = createReducer(
  authInitialState,

  on(authActions.logInSuccess, authActions.signUpSuccess, (state, action) => {
    return { ...state, auth: action.auth };
  }),

  on(authActions.logInFail, authActions.signUpFail, (state, action) => {
    return { ...state, error: action.error };
  }),

  on(authActions.logout, authActions.logIn, (state) => {
    return { ...state, auth: null, error: null };
  })
);
