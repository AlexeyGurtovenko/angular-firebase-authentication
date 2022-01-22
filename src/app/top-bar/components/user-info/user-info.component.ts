import { Component } from '@angular/core';
import { SubscriberComponent } from 'src/shared/subscriber/subscriber.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent extends SubscriberComponent {

  readonly user$ = this._auth.$user;
  isOpen = false;

  constructor (private _auth: AuthService, private _router: Router) {
    super();
  }

  logout() {
    this._auth
      .signOut()
      .subscribe(() => this._router.navigateByUrl('/auth'));
  }
}
