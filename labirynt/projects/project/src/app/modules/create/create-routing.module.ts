import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateMainContainerComponent } from './container/create-main-container/create-main-container.component';

const routes: Routes = [
  {
    path: '',
    component: CreateMainContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
