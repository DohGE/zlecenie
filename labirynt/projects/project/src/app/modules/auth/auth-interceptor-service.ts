/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auth } from '../../shared/models/auth.model';
import { AuthFacade } from './store/auth.facade';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authFacade: AuthFacade, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    let idToken: string;
    this.authFacade.auth$.subscribe((auth: Auth) => {
      idToken = auth?.idToken;
    });
    if (idToken) {
      req = this.addToken(req, idToken);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        this.router.navigate(['/auth']);
        return throwError(error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
