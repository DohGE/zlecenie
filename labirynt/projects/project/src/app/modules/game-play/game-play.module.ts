import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GamePlayRoutingModule } from './game-play-routing.module';
import { GamePlayStartContainerComponent } from './container/game-play-start-container/game-play-start-container.component';
import { GamePlayStartPresenterComponent } from './presenter/game-play-start-presenter/game-play-start-presenter.component';

@NgModule({
  declarations: [
    GamePlayStartContainerComponent,
    GamePlayStartPresenterComponent,
  ],
  imports: [GamePlayRoutingModule, SharedModule],
})
export class GamePlayModule {}
