import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthSignupInput,
  validEmail,
  validPassword,
  validUsername
} from '@fullstack/data';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'pwa-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../auth.component.scss']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  hidePassword: boolean;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.hidePassword = true;

    this.formGroup = this.formBuilder.group(
      {
        username: [
          null,
          [Validators.required, Validators.pattern(validUsername.regexp)]
        ],
        email: [
          null,
          [Validators.required, Validators.pattern(validEmail.regexp)]
        ],
        password: [
          null,
          [Validators.required, Validators.pattern(validPassword.regexp)]
        ],
        confirmPassword: [null, [Validators.required]]
      },
      {
        validators: [
          this.mustMatchValidator('password', 'confirmPassword'),
          this.mustNotBeRejectedValidator()
        ]
      }
    );
  }

  async submit(formValue: AuthSignupInput) {
    try {
      this.errorMessage = undefined;
      this.hidePassword = true;
      this.isLoading = true;
      this.formGroup.disable();
      await this.authService.signup(formValue);
      this.router.navigate(['home']);
    } catch (err) {
      console.log('err: ', err);
      this.errorMessage = err.error.message || err.message;
    } finally {
      this.isLoading = false;
      this.formGroup.enable();
    }
  }

  private mustMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // Another validator has already found an error on the matchingControl
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
