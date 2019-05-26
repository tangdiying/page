import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page1RoutingModule } from './page1-routing.module';
import { Page1Component } from './page1.component';
import { Demo1Component } from './demo1/demo1.component';
import { DatascrollDirective } from './datascroll.directive';

@NgModule({
  declarations: [Page1Component, Demo1Component, DatascrollDirective],
  imports: [
    CommonModule,
    Page1RoutingModule
  ],
  exports:[
    Page1Component
  ]
})
export class Page1Module { }
