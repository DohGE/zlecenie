import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeMainContainerComponent } from './container/home-main-container/home-main-container.component';
import { HomeMainPresenterComponent } from './presenter/home-main-presenter/home-main-presenter.component';

@NgModule({
  declarations: [HomeMainContainerComponent, HomeMainPresenterComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
