import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.interface';
import { authReducer } from '../modules/auth/store/auth-state/auth.reducer';
import { usersReducer } from '../modules/user/store/user-state/user.reducer';
import { gamesReducer } from '../modules/games/store/games-state/games.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  users: usersReducer,
  games: gamesReducer,
};
