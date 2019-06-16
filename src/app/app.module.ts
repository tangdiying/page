import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Module } from './page1/page1.module';
import { SubjectModule } from './subject/subject.module';
import { FlexComponent } from './flex/flex.component';
import { Page2Component } from './page2/page2.component';
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';
import { Page3Component } from './page3/page3.component';
@NgModule({
  declarations: [
    AppComponent,
    FlexComponent,
    Page2Component,
    Demo1Component,
    Demo2Component,
    Page3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Page1Module,
    SubjectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
