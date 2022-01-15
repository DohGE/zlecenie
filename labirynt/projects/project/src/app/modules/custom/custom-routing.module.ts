import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomHomeContainerComponent } from './container/custom-home-container/custom-home-container.component';

const routes: Routes = [
  {
    path: '',
    component: CustomHomeContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomRoutingModule {}
