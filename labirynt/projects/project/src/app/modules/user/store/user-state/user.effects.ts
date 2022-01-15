import { User } from './../../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { select, Store } from '@ngrx/store';
import { getUser } from '../user.index';
import * as fromApp from '../../../../store/app.interface';
import * as gamesActions from './../../../games/store/games-state/games.actions';
import * as userActions from './user.actions';
import * as authActions from '../../../auth/store/auth-state/auth.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        userActions.saveUser,
        authActions.signUpSuccess,
        gamesActions.saveGameSuccess
      ),
      withLatestFrom(this.store.pipe(select(getUser))),
      switchMap(([action, user]) =>
        this.userService.saveUser(user).pipe(
          map(() => userActions.saveUserSuccess()),
          catchError((error) =>
            of(
              userActions.saveUserFail({ error: error?.error?.error?.message })
            )
          )
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      switchMap(() =>
        this.userService.loadUser().pipe(
          map((user: User) =>
            userActions.loadUserSuccess({
              user: user,
            })
          ),
          catchError((error) =>
            of(userActions.loadUserFail({ error: error.error.error.message }))
          )
        )
      )
    )
  );
}
