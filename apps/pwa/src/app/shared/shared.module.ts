import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogCheckMailboxComponent } from './components/dialog-check-mailbox/dialog-check-mailbox.component';
import { ImageDefaultDirective } from './directives/image-default.directive';
import { MaterialModule } from './material.module';
import { ImageApiPipe } from './pipes/image-api.pipe';

@NgModule({
  imports: [MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    ImageDefaultDirective,
    FormsModule,
    ReactiveFormsModule,
    ImageApiPipe,
    DialogCheckMailboxComponent,
  ],
  declarations: [
    ImageDefaultDirective,
    ImageApiPipe,
    DialogCheckMailboxComponent,
  ],
})
export class SharedModule {}
