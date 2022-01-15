import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AngularMaterialsModule } from './angular-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeOfPipe } from './pipes/type.pipe';
import { HomeTableComponent } from './components/home-table/home-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [TypeOfPipe, HomeTableComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    AngularMaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    TypeOfPipe,
    HomeTableComponent,
    LoadingSpinnerComponent,
  ],
  providers: [DecimalPipe],
})
export class SharedModule {}
