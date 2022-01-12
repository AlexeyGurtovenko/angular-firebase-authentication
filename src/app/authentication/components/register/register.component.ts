import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from '../../services/auth.service';

import { BaseInputComponent } from 'src/shared/base-input/base-input.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

  isLoading: boolean = false;
  form: FormGroup = new FormGroup({});

  emailValidators: ValidatorFn[] = [Validators.required, Validators.email];
  passValidators: ValidatorFn[] = [Validators.required, Validators.minLength(8)];

  isPassVisible: boolean = false;
  isPassConfirmVisible: boolean = false;

  @ViewChild('email', { static: true }) emailControl: BaseInputComponent;
  @ViewChild('password', { static: true }) passwordControl: BaseInputComponent;
  @ViewChild('passwordConfirm', { static: true }) passwordConfirm: BaseInputComponent;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passConfirm() {
    return this.form.get('passConfirm');
  }

  constructor (
    private _authService: AuthService,
    private _notify: NotificationService,
    private _router: Router
  ) { }
  
  ngAfterViewInit(): void {
    this.form = new FormGroup({
      "email": this.emailControl.input,
      "password": this.passwordControl.input,
      "passConfirm": this.passwordConfirm.input
    });
  }

  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email: string = this.email?.value;
    const password: string = this.password?.value;
    const passwordConfrimation: string = this.passConfirm?.value;
    
    if (password === passwordConfrimation) {
      this.isLoading = true;
      this._authService
        .signupWithEmail(email, password)
        .subscribe(() => this._router.navigateByUrl(''), () => this.isLoading = false);
    } else {
      this._notify.error('Passwords do not match', 'Try again');
    }
  }
}
