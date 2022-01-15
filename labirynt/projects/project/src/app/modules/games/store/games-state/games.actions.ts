import { createAction, props } from '@ngrx/store';
import { Block } from 'projects/project/src/app/shared/models/block.model';
import { Game } from 'projects/project/src/app/shared/models/game.model';
import { User } from 'projects/project/src/app/shared/models/user.model';

export const loadGames = createAction('[Games] Load Games');

export const loadGamesSuccess = createAction(
  '[Games] Load Games Success',
  props<{ games: Game[] }>()
);

export const loadGamesFail = createAction(
  '[Games] Load Games Fail',
  props<{ error: string }>()
);

export const saveGame = createAction(
  '[Games] Save Game',
  props<{ game: Game }>()
);

export const saveGameSuccess = createAction(
  '[Games] Save Game Success',
  props<{ user: User }>()
);

export const saveGameFail = createAction(
  '[Games] Save Game Fail',
  props<{ error: string }>()
);

export const deleteGame = createAction(
  '[Games] Delete IGame',
  props<{ id: string }>()
);

export const upsertGames = createAction(
  '[Games] Add Games',
  props<{ games: Game[] }>()
);

export const addBlock = createAction(
  '[Games] Add Block',
  props<{ block: Block }>()
);

export const deleteBlock = createAction(
  '[Games] Delete Block',
  props<{ id: number | string }>()
);

export const loadBlocks = createAction('[Games] Load Blocks');

export const loadBlocksSuccess = createAction(
  '[Games] Load Blocks Success',
  props<{ blocks: Block[] }>()
);

export const loadBlocksFail = createAction(
  '[Games] Load Blocks Fail',
  props<{ error: string }>()
);

export const saveBlocks = createAction(
  '[Games] Save Block',
  props<{ block: Block }>()
);

export const saveBlocksSuccess = createAction('[Games] Save Block Success');

export const saveBlocksFail = createAction(
  '[Games] Save Block Fail',
  props<{ error: string }>()
);

export const upsertSelectedGame = createAction(
  '[Games] Upsert Selected Game',
  props<{ game: Game }>()
);
