import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as fromApp from '../../../store/app.interface';
import * as gamesActions from './games-state/games.actions';
import * as fromGames from './games-state/games.reducer';
import { Game } from '../../../shared/models/game.model';
import { getBlocks, getLoading, getSelectedGame } from './games.index';
import { Block } from '../../../shared/models/block.model';

@Injectable({ providedIn: 'root' })
export class GamesFacade {
  games$: Observable<Game[]> = this.store.pipe(select(fromGames.selectAll));
  selectedGame$: Observable<Game> = this.store.pipe(select(getSelectedGame));
  blocks$: Observable<Block[]> = this.store.pipe(select(getBlocks));
  loading$: Observable<boolean> = this.store.pipe(select(getLoading));

  constructor(private store: Store<fromApp.AppState>) {}

  upsertSelectedGame(game: Game): void {
    this.store.dispatch(gamesActions.upsertSelectedGame({ game }));
  }

  loadGames(): void {
    this.store.dispatch(gamesActions.loadGames());
  }

  saveGame(game: Game): void {
    this.store.dispatch(gamesActions.saveGame({ game }));
  }

  deleteGame(id: string): void {
    this.store.dispatch(gamesActions.deleteGame({ id }));
  }

  upsertGames(games: Game[]): void {
    this.store.dispatch(gamesActions.upsertGames({ games }));
  }

  loadBlocks(): void {
    this.store.dispatch(gamesActions.loadBlocks());
  }

  deleteBlock(id: string): void {
    this.store.dispatch(gamesActions.deleteBlock({ id }));
  }

  addBlock(block: Block): void {
    this.store.dispatch(gamesActions.addBlock({ block }));
  }

  saveBlock(block: Block): void {
    this.store.dispatch(gamesActions.saveBlocks({ block }));
  }
}
