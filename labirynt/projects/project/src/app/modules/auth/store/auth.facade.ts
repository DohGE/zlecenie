import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Auth } from '../../../shared/models/auth.model';
import { SignUp } from '../../../shared/models/signUp.model';
import * as fromApp from '../../../store/app.interface';
import * as authActions from './auth-state/auth.actions';
import { getError, getAuth } from './auth.index';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  auth$: Observable<Auth> = this.store.pipe(select(getAuth));
  getError$: Observable<string> = this.store.pipe(select(getError));

  constructor(private store: Store<fromApp.AppState>) {}

  signUp(signUp: SignUp): void {
    this.store.dispatch(authActions.signUp({ signUp }));
  }

  logIn(signUp: SignUp): void {
    this.store.dispatch(authActions.logIn({ signUp }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
