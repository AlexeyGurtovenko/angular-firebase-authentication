import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss']
})
export class NotificationBellComponent  {

  @Input() newNotifications: boolean = false;
  @Output() bellClicked = new EventEmitter<void>();

  constructor () { }
  
  onClick() {
    this.bellClicked.emit();
  }
}
