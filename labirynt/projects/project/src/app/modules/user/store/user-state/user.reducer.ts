import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { User } from '../../../../shared/models/user.model';
import * as usersActions from './user.actions';
import * as authActions from '../../../auth/store/auth-state/auth.actions';
import * as gamesActions from './../../../games/store/games-state/games.actions';

export interface usersState {
  user: User | null;
  loading: boolean;
  error: string;
}

export const usersInitialState = {
  user: null,
  loading: false,
  error: '',
};

export const getUsersState = createFeatureSelector<usersState>('users');

export const usersReducer = createReducer(
  usersInitialState,

  on(
    usersActions.saveUser,
    authActions.signUpSuccess,
    gamesActions.saveGameSuccess,
    (state, action) => {
      let temporaryAchievements;
      let temporaryGames;
      if (state.user?.achievements) {
        temporaryAchievements = state.user?.achievements.concat(
          action.user?.achievements
        );
      } else {
        temporaryAchievements = action.user?.achievements;
      }
      if (state.user?.games) {
        temporaryGames = state.user?.games.concat(action.user?.games);
      } else {
        temporaryGames = action.user?.games;
      }
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
          achievements: temporaryAchievements,
          games: temporaryGames,
        },
        loading: true,
      };
    }
  ),

  on(usersActions.saveUserSuccess, (state) => {
    return { ...state, loading: false };
  }),

  on(usersActions.loadUserFail, usersActions.saveUserFail, (state, action) => {
    return { ...state, error: action.error };
  }),

  on(usersActions.loadUserSuccess, (state, action) => {
    return { ...state, user: action.user };
  })
);
