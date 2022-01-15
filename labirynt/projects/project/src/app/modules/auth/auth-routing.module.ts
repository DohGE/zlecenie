import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginContainerComponent } from './container/auth-login-container/auth-login-container.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLoginContainerComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
