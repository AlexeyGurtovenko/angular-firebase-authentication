import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { BaseInputComponent } from 'src/shared/base-input/base-input.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  form: FormGroup = new FormGroup({});
  isLoading: boolean = false;

  emailValidators: ValidatorFn[] = [Validators.required, Validators.email];
  passValidators: ValidatorFn[] = [Validators.required, Validators.minLength(8)];
  isPassVisible: boolean = false;

  @ViewChild('email', { static: true }) emailControl: BaseInputComponent;
  @ViewChild('password', { static: true }) passwordControl: BaseInputComponent;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor (private _authService: AuthService, private _router: Router) { }
  
  ngAfterViewInit(): void {
    this.form = new FormGroup({
      "email": this.emailControl.input,
      "password": this.passwordControl.input,
    });
  }

  loginWithGoogle() {
    this._authService
      .signInWithGoogle()
      .subscribe(() => this._router.navigateByUrl(''));
  }

  loginWithFacebook() {
    this._authService
      .signInWithFacebook()
      .subscribe(() => this._router.navigateByUrl(''));
  }

  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.email?.value;
    const password = this.password?.value;
    this.isLoading = true;
    
    this._authService
      .signinWithEmail(email, password)
      .subscribe(() => this._router.navigateByUrl(''), error => this.isLoading = false);
  }
}
