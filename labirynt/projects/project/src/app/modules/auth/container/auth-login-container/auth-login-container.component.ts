import { Component } from '@angular/core';
import { SignUp } from 'projects/project/src/app/shared/models/signUp.model';

import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-auth-login-container',
  templateUrl: './auth-login-container.component.html',
  styleUrls: ['./auth-login-container.component.scss'],
})
export class AuthLoginContainerComponent {
  constructor(private authFacade: AuthFacade) {}

  onLogin(logIn: SignUp): void {
    this.authFacade.logIn(logIn);
  }

  onRegister(signUp: SignUp): void {
    this.authFacade.signUp(signUp);
  }
}
