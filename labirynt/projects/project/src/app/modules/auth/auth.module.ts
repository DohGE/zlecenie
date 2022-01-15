import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginContainerComponent } from './container/auth-login-container/auth-login-container.component';
import { AuthLoginPresenterComponent } from './presenter/auth-login-presenter/auth-login-presenter.component';
import { AuthSignUpPresenterComponent } from './presenter/auth-sign-up-presenter/auth-sign-up-presenter.component';

@NgModule({
  declarations: [
    AuthLoginContainerComponent,
    AuthLoginPresenterComponent,
    AuthSignUpPresenterComponent,
  ],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
