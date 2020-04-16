import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  AuthSignupInput,
  validEmail,
  validPassword,
  validUsername,
} from '@fullstack/data';
import { take } from 'rxjs/operators';
import { DialogCheckMailboxComponent } from '../../../shared/components/dialog-check-mailbox/dialog-check-mailbox.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'pwa-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../auth.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  hidePassword: boolean;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.hidePassword = true;

    this.formGroup = this.formBuilder.group(
      {
        username: [
          null,
          [Validators.required, Validators.pattern(validUsername.regexp)],
        ],
        email: [
          null,
          [Validators.required, Validators.pattern(validEmail.regexp)],
        ],
        password: [
          null,
          [Validators.required, Validators.pattern(validPassword.regexp)],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: [
          this.mustMatchValidator('password', 'confirmPassword'),
          this.mustNotBeRejectedValidator(),
        ],
      }
    );
  }

  submit(formGroup: FormGroup): void {
    const authSignupInput: AuthSignupInput = {
      username: formGroup.getRawValue().username,
      email: formGroup.getRawValue().email,
      password: formGroup.getRawValue().password,
    };
    this.errorMessage = undefined;
    this.hidePassword = true;
    this.isLoading = true;
    this.formGroup.disable();
    this.authService
      .signup(authSignupInput)
      .pipe(take(1))
      .subscribe(
        async (res) => {
          const dialog = this.dialog.open(DialogCheckMailboxComponent);
          await dialog.afterClosed().pipe(take(1)).toPromise();
          this.router.navigate(['/home']);
        },
        (err) => {
          this.isLoading = false;
          this.formGroup.enable();
          this.errorMessage = err?.error?.message || err?.message || err;
        }
      );
  }

  onCloseDialog(): Promise<boolean> {
    this.dialog.closeAll();
    return this.router.navigate(['home']);
  }

  private mustMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // Another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  private mustNotBeRejectedValidator(): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      if (this.errorMessage === 'email already exists') {
        formGroup.controls['email'].setErrors({ mustNotBeRejected: true });
        this.errorMessage = 'Please choose another email';
      }
      if (this.errorMessage === 'username already exists') {
        formGroup.controls['username'].setErrors({ mustNotBeRejected: true });
        this.errorMessage = 'Please choose another username';
      }
      return;
    };
  }
}
