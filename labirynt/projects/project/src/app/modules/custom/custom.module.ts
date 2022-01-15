import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomRoutingModule } from './custom-routing.module';
import { CustomHomeContainerComponent } from './container/custom-home-container/custom-home-container.component';

@NgModule({
  declarations: [CustomHomeContainerComponent],
  imports: [CustomRoutingModule, SharedModule],
})
export class CustomModule {}
