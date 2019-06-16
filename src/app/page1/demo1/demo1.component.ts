import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Page} from '../data'
import { HttpClient } from '@angular/common/http';
import { of, from, pipe } from 'rxjs';
import { tap,filter,map,debounceTime } from 'rxjs/operators'
@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.less']
})
export class Demo1Component implements OnInit {
  @ViewChild('demo1') demo1:ElementRef;
  public myPageData;
  constructor(
    private http:HttpClient
  ) { }
  // this.demo1.nativeElement.onscroll = function(){

  // }
  ngOnInit() {
    this.getdata()
    of(10, 21, 30)
    // .pipe(
    //   tap(
    //     val => {
    //       console.log('tap next', val);
    //     },
    //     null,
    //     () => {
    //       console.log('tap complete');
    //     }
    //   )
    // )
    .pipe(
      filter(val=>val%5===0)
    )
    .pipe(debounceTime(2000))
    .subscribe(
      next => console.log('next:', next),
      err => console.log('error:', err),
      () => console.log('the end'),
    );
  }
  getdata(){
    this.http.get('http://localhost:8000/getdata')
    .subscribe(res=>{
      console.log(res)
      this.myPageData = res['data'];
    })
  }

  mytdy(e){
    console.log(e)
    this.myPageData = e;
  }
}
