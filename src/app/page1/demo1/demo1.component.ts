import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Page} from '../data'
@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.less']
})
export class Demo1Component implements OnInit,AfterViewInit {
  @ViewChild('demo1') demo1:ElementRef;
  public myPageData= Page;
  constructor() { }
  // this.demo1.nativeElement.onscroll = function(){

  // }
  ngOnInit() {
    
    
  }
  ngAfterViewInit(){
    // this.pageScroll()
  }
  loadMore(){
    // this.myPageData.push(this.myPageData[0])
  }
  pageScroll(){
    // console.log(this.demo1.nativeElement.scrollTop)
    // console.dir(this.demo1.nativeElement)
    this.demo1.nativeElement.onscroll = function(e){
      let mypage = e.srcElement;
      // console.dir(e.srcElement)
      // console.log(e.srcElement.scrollTop)
      // console.log(e.srcElement.scrollHeight)
      // console.log(e.srcElement.scrollTop+e.srcElement.clientHeight)
      if(mypage.scrollTop+mypage.clientHeight>=mypage.scrollHeight){
        // console.log(true)
        // this.loadMore()
        // this.myPageData = {id:0,name:"hwx",age:18}
        // console.log(this.myPageData)
        // this.myPageData.push(this.myPageData[0])
      }
      
    }
  }

  mytdy(e){
    console.log(e)
    this.myPageData = e;
  }
}
