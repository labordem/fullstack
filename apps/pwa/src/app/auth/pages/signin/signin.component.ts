import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSigninInput, validEmail, validPassword } from '@fullstack/data';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'pwa-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../../auth.component.scss']
})
export class SigninComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  hidePassword: boolean;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hidePassword = true;

    this.formGroup = this.formBuilder.group(
      {
        email: [
          null,
          [Validators.required, Validators.pattern(validEmail.regexp)]
        ],
        password: [null, [Validators.required]]
      },
      {
        validators: this.mustNotBeRejectedValidator()
      }
    );
  }

  async submit(formValue: AuthSigninInput): Promise<void> {
    try {
      this.errorMessage = undefined;
      this.hidePassword = true;
      this.isLoading = true;
      this.formGroup.disable();
      await this.authService.signin(formValue);
      this.router.navigate(['home']);
    } catch (err) {
      console.log('err: ', err);
      this.errorMessage = err.error.message || err.message;
    } finally {
      this.isLoading = false;
      this.formGroup.enable();
    }
  }

  private mustNotBeRejectedValidator(): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      if (this.errorMessage === validEmail.message) {
        formGroup.controls['email'].setErrors({ mustNotBeRejected: true });
        this.errorMessage = 'Please check your email';
      }
      if (this.errorMessage === validPassword.message) {
        formGroup.controls['password'].setErrors({ mustNotBeRejected: true });
        this.errorMessage = 'Please check your password';
      }
      return;
    };
  }
}
