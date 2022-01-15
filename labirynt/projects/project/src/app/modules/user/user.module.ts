import { UserProfilePresenterComponent } from './presenter/user-profile-presenter/user-profile-presenter.component';
import { UserProfileContainerComponent } from './container/user-profile-container/user-profile-container.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserProfileContainerComponent, UserProfilePresenterComponent],
  imports: [UserRoutingModule, SharedModule],
})
export class UserModule {}
