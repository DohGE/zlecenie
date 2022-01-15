import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../../shared/models/auth.model';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthFacade } from './store/auth.facade';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.auth$.pipe(
      map((auth: Auth) => {
        if (auth?.idToken) {
          return true;
        } else {
          this.notificationService.showInfo(
            'Jesteś niezalogowanym użytkownikiem!',
            'Informacja!'
          );
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }
}
