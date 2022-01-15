import { UserGames } from './userGames.model';

export interface User {
  name?: string;
  email?: string;
  games?: UserGames[];
  achievements?: string[];
}
