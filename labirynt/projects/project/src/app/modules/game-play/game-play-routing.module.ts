import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GamePlayStartContainerComponent } from './container/game-play-start-container/game-play-start-container.component';

const routes: Routes = [
  {
    path: '',
    component: GamePlayStartContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePlayRoutingModule {}
