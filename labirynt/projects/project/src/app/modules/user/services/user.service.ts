import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { Auth } from '../../../shared/models/auth.model';
import { User } from '../../../shared/models/user.model';
import { AuthFacade } from '../../auth/store/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoints = {
    link: 'https://quiziz-ebe4c-default-rtdb.firebaseio.com/',
    user: '/user.json',
  };
  constructor(private http: HttpClient, private authFacade: AuthFacade) {}

  saveUser(user: User): Observable<User> {
    return this.authFacade.auth$.pipe(
      take(1),
      exhaustMap((auth: Auth) => {
        return this.http.put<User>(
          this.endpoints.link + auth.localId + this.endpoints.user,
          user,
          {
            params: new HttpParams().set('auth', auth?.idToken),
          }
        );
      })
    );
  }

  loadUser(): Observable<User> {
    return this.authFacade.auth$.pipe(
      take(1),
      exhaustMap((auth: Auth) => {
        return this.http.get<User>(
          this.endpoints.link + auth.localId + this.endpoints.user,
          {
            params: new HttpParams().set('auth', auth?.idToken),
          }
        );
      })
    );
  }
}
