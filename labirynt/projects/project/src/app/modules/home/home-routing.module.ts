import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeMainContainerComponent } from './container/home-main-container/home-main-container.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMainContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
