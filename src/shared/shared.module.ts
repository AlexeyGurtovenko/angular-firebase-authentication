import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinerComponent } from './spiner/spiner.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';

const COMPONENTS = [
  SubscriberComponent,
  SvgIconComponent,
  SpinerComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [...COMPONENTS]
})
export class SharedModule { }
