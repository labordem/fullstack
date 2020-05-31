import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'email-confirmation/:emailToken',
    component: EmailConfirmationComponent,
  },
  {
    path: 'email-confirmation',
    redirectTo: 'email-confirmation/',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [SigninComponent, SignupComponent, EmailConfirmationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AuthModule {}
