import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileContainerComponent } from './container/user-profile-container/user-profile-container.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileContainerComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
