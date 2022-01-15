import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GamesHomeContainerComponent } from './container/games-home-container/games-home-container.component';

const routes: Routes = [
  {
    path: '',
    component: GamesHomeContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
