import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserEditComponent } from './user-edit.component';

const routes: Routes = [{ path: '', component: UserEditComponent }];

@NgModule({
  declarations: [UserEditComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class UserEditModule {}
