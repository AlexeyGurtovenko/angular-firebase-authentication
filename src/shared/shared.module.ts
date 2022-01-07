import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubscriberComponent } from './subscriber/subscriber.component';

const COMPONENTS = [
  SubscriberComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [...COMPONENTS]
})
export class SharedModule { }
