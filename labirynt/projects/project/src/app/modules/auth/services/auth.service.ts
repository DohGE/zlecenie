import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../../../shared/models/auth.model';
import { SignUp } from '../../../shared/models/signUp.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly endpoints = {
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    logIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
  };
  constructor(private http: HttpClient) {}

  signUp(signUp: SignUp): Observable<Auth> {
    return this.http.post<Auth>(this.endpoints.signUp, {
      ...signUp,
      returnSecureToken: true,
    });
  }

  logIn(signUp: SignUp): Observable<Auth> {
    return this.http.post<Auth>(this.endpoints.logIn, {
      ...signUp,
      returnSecureToken: true,
    });
  }
}
