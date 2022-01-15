import { createSelector } from '@ngrx/store';
import * as fromGamess from './games-state/games.reducer';
import { getGamesState } from './games-state/games.reducer';

export const getSelectedGame = createSelector(
  getGamesState,
  (state: fromGamess.gamesState) => state.selectedGame
);

export const getBlocks = createSelector(
  getGamesState,
  (state: fromGamess.gamesState) => state.blocks
);

export const getLoading = createSelector(
  getGamesState,
  (state: fromGamess.gamesState) => state.loading
);
