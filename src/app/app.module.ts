import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { NzSpinModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { PageVirtualDirective } from './page-virtual/page-virtual.directive';
@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    VirtualScrollComponent,
    PageVirtualDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzSpinModule,
    HttpClientModule,
    ScrollDispatchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
