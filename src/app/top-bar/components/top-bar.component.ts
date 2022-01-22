import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriberComponent } from 'src/shared/subscriber/subscriber.component';
import { takeUntil } from 'rxjs';
import { BaseInputComponent } from 'src/shared/base-input/base-input.component';
import { AuthService } from 'src/app/authentication/services/auth.service';

interface Ilink {
  path: string;
  name: string;
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent extends SubscriberComponent implements AfterViewInit {

  @ViewChild('search', { static: false }) searchBar: BaseInputComponent;

  readonly links: Ilink[] = [
    { path: '#', name: 'Link#1' },
    { path: '#', name: 'Link#2' },
    { path: '#', name: 'Link#3' },
  ]

  constructor (private _auth: AuthService, private _router: Router) {
    super();
  }

  ngAfterViewInit() {
    this.searchBar.input
      .valueChanges
      .pipe(takeUntil(this.isAlive))
      .subscribe((value: string) => { })
  }

  onBellClicked() {
    
  }

  onLogout() {
    this._auth
      .signOut()
      .subscribe(() => this._router.navigateByUrl('/auth'));
  }
}
