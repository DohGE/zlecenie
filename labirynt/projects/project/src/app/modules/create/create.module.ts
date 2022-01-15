import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CreateRoutingModule } from './create-routing.module';
import { CreateMainContainerComponent } from './container/create-main-container/create-main-container.component';
import { CreateMainPresenterComponent } from './presenter/create-main-presenter/create-main-presenter.component';
import { CreateEditPresenterComponent } from './presenter/create-edit-presenter/create-edit-presenter.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { InViewportModule } from 'ng-in-viewport';
import { CreateSavePresenterComponent } from './presenter/create-save-presenter/create-save-presenter.component';

@NgModule({
  declarations: [
    CreateMainContainerComponent,
    CreateMainPresenterComponent,
    CreateEditPresenterComponent,
    CreateSavePresenterComponent,
  ],
  imports: [
    CreateRoutingModule,
    SharedModule,
    InViewportModule,
    NgxGraphModule,
  ],
  exports: [InViewportModule, NgxGraphModule],
})
export class CreateModule {}
