import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from './base-input/base-input.component';
import { SpinerComponent } from './spiner/spiner.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';

const COMPONENTS = [
  SubscriberComponent,
  SvgIconComponent,
  SpinerComponent, 
  BaseInputComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [...COMPONENTS, ReactiveFormsModule]
})
export class SharedModule { }
