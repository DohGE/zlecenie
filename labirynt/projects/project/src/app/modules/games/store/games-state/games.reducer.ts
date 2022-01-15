import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Block } from 'projects/project/src/app/shared/models/block.model';
import { Game } from 'projects/project/src/app/shared/models/game.model';

import * as gamesActions from './games.actions';

export interface gamesState extends EntityState<Game> {
  selectedGame: Game;
  blocks: Block[];
  error: string | null;
  loading: boolean;
}

export const gamesAdapter: EntityAdapter<Game> = createEntityAdapter<Game>();

export const gamesInitialState = gamesAdapter.getInitialState({
  selectedGame: null,
  blocks: [],
  error: null,
  loading: false,
});

export const getGamesState = createFeatureSelector<gamesState>('games');

export const gamesReducer = createReducer(
  gamesInitialState,

  on(gamesActions.upsertSelectedGame, (state, action) => {
    return { ...state, selectedGame: action.game };
  }),

  on(gamesActions.loadGamesSuccess, (state, action) => {
    return gamesAdapter.upsertMany(action.games, state);
  }),

  on(
    gamesActions.loadGamesFail,
    gamesActions.saveGameFail,
    gamesActions.loadGamesFail,
    (state, action) => {
      return { ...state, error: action.error };
    }
  ),

  on(gamesActions.saveGame, (state, action) => {
    const game = { ...action.game };
    game.id = state.ids.length;
    return gamesAdapter.addOne(game, state);
  }),

  on(gamesActions.saveGameSuccess, (state) => {
    return { ...state, blocks: [] };
  }),

  on(gamesActions.deleteGame, (state, action) => {
    return gamesAdapter.removeOne(action.id, state);
  }),

  on(gamesActions.upsertGames, (state, action) => {
    return gamesAdapter.upsertMany(action.games, state);
  }),

  on(gamesActions.loadBlocks, (state) => {
    return { ...state, loading: true };
  }),

  on(gamesActions.loadBlocksSuccess, (state, action) => {
    return { ...state, blocks: action.blocks, loading: false };
  }),

  on(gamesActions.addBlock, (state, action) => {
    return { ...state, blocks: [...state.blocks, { ...action.block }] };
  }),

  on(gamesActions.deleteBlock, (state, action) => {
    const newBlocks = [...state.blocks];
    newBlocks.forEach((block, index) => {
      block.id === action.id ? newBlocks.splice(index, 1) : null;
    });
    return { ...state, blocks: newBlocks };
  }),

  on(gamesActions.saveBlocks, (state, action) => {
    const newBlocks = [...state.blocks];
    newBlocks.forEach((block, index) => {
      block.id === action.block.id ? (newBlocks[index] = action.block) : null;
    });
    return { ...state, blocks: newBlocks };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  gamesAdapter.getSelectors(getGamesState);
