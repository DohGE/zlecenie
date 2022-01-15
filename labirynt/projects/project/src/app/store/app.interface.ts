import * as fromAuth from '../modules/auth/store/auth-state/auth.reducer';
import * as fromUser from '../modules/user/store/user-state/user.reducer';
import * as fromGames from '../modules/games/store/games-state/games.reducer';

export interface AppState {
  auth: fromAuth.authState;
  users: fromUser.usersState;
  games: fromGames.gamesState;
}
