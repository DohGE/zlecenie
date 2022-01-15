import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { GamesService } from '../../services/games.service';
import { Game } from '../../../../shared/models/game.model';
import { Block } from 'projects/project/src/app/shared/models/block.model';
import { select, Store } from '@ngrx/store';
import { getBlocks } from '../games.index';
import { NotificationService } from 'projects/project/src/app/shared/services/notification.service';
import * as gamesActions from './games.actions';
import * as fromApp from '../../../../store/app.interface';
import * as fromGames from './games.reducer';

@Injectable()
export class GamesEffects {
  constructor(
    private actions$: Actions,
    private gamesService: GamesService,
    private store: Store<fromApp.AppState>,
    private notificationService: NotificationService
  ) {}

  loadGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadGames),
      exhaustMap(() =>
        this.gamesService.loadGames().pipe(
          map((games: Game[]) => gamesActions.loadGamesSuccess({ games })),
          catchError((error) =>
            of(gamesActions.loadGamesFail({ error: error.error }))
          )
        )
      )
    )
  );

  saveGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.saveGame),
      withLatestFrom(this.store.pipe(select(fromGames.selectAll))),
      switchMap(([action, enitites]) =>
        this.gamesService.saveGame(enitites).pipe(
          map(() => {
            this.notificationService.showSuccess(
              'Pomyślnie zapisano grę!',
              'Sukces'
            );
            return gamesActions.saveGameSuccess({
              user: {
                games: [
                  {
                    name: action.game.name,
                    date: action.game.date,
                  },
                ],
              },
            });
          }),
          catchError((error) =>
            of(gamesActions.saveGameFail({ error: error.error }))
          )
        )
      )
    )
  );

  loadBlocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.loadBlocks),
      exhaustMap(() =>
        this.gamesService.loadBlocks().pipe(
          map((blocks: Block[]) => {
            if (blocks?.length) {
              this.notificationService.showInfo(
                'Pomyślnie wczytano ostatnią pracę!',
                'Informacja'
              );
            }
            return gamesActions.loadBlocksSuccess({ blocks: blocks });
          }),
          catchError((error) =>
            of(gamesActions.loadBlocksFail({ error: error.error }))
          )
        )
      )
    )
  );

  saveBlock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        gamesActions.saveBlocks,
        gamesActions.deleteBlock,
        gamesActions.saveGameSuccess
      ),
      withLatestFrom(this.store.pipe(select(getBlocks))),
      switchMap(([action, blocks]) =>
        this.gamesService.saveBlocks([...blocks]).pipe(
          map(() => gamesActions.saveBlocksSuccess()),
          catchError((error) =>
            of(gamesActions.saveBlocksFail({ error: error.error }))
          )
        )
      )
    )
  );
}
