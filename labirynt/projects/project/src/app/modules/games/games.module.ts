import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GamesRoutingModule } from './games-routing.module';
import { GamesHomeContainerComponent } from './container/games-home-container/games-home-container.component';

@NgModule({
  declarations: [GamesHomeContainerComponent],
  imports: [GamesRoutingModule, SharedModule],
})
export class GamesModule {}
