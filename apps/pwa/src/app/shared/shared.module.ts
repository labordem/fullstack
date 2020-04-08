import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageDefaultDirective } from './directives/image-default.directive';
import { MaterialModule } from './material.module';
import { ImageApiPipe } from './pipes/image-api.pipe';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    ImageDefaultDirective,
    FormsModule,
    ReactiveFormsModule,
    ImageApiPipe
  ],
  declarations: [ImageDefaultDirective, ImageApiPipe]
})
export class SharedModule {}
