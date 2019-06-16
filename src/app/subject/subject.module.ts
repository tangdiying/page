import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [SubjectComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    HttpClientModule
  ],
  exports:[
    SubjectComponent
  ]
})
export class SubjectModule { }
