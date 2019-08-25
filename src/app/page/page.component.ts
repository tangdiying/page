import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, OnChanges, OnDestroy, TemplateRef } from '@angular/core';
import * as _ from "lodash"
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent implements OnInit,OnDestroy,OnChanges {
  @ViewChild("pageContainer") pageContainer:ElementRef;
  isBottomLoading:boolean = false;
  isTopLoading:boolean = false;
  reachBottom:boolean = false;
  reachTop:boolean = false;
  reachBottompadding:number = 0;
  reachToppadding:number = 0;
  topSetTimeout;
  topWaitSetTimeout;
  bottomSetTimeout;
  bottomWaitSetTimeout;
  scrollEvent = null;
  wheelEvent = null;
  flagEmit:boolean = true;//限制到底部发射信息的次数
  @Input() isGetData:boolean = false;
  @Output() isGetDataChange = new EventEmitter<any>()
  @Output() afterReachBottom = new EventEmitter<any>();//到达底部后向外发送信号,需要获取页面数据
  @Input() handleClass = "";
  @Input() loadTemplate:TemplateRef<any> = null;
  flag:boolean = true;
  constructor(
  ) { }

  ngOnInit() {
    if(this.loadTemplate){
      this.flag = false
    }
    this.bind()
  }
  ngOnDestroy(): void {
    this.scrollEvent.unsubscribe()
    this.wheelEvent.unsubscribe()
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  }
  bind(){
    let  dom = this.checkScrollBar(this.handleClass);
    this.scrollEvent = fromEvent(dom,"scroll")
    .subscribe(e=>{
      if(e["srcElement"]['scrollTop']+e["srcElement"]['clientHeight']+10>e["srcElement"]['scrollHeight']){
        this.reachBottom = true
      }
      if(e["srcElement"]['scrollTop']==0){
        this.reachTop = true;
      }
    })
    this.wheelEvent = fromEvent(dom,"wheel")
    .subscribe(e=>{
      this.scrollReachTop(e)
      this.scrollReachBottom(e)
    })
  }
  scrollReachTop(e){
    if(this.reachTop&&e.deltaY<0){
      if(this.reachToppadding<=30){
        clearTimeout(this.topWaitSetTimeout)
        this.reachToppadding++;
        this.topWaitSetTimeout = setTimeout(() => {
          this.reachToppadding = 0;
        }, 500);
      }
      if(this.reachToppadding>=30){
        clearTimeout(this.topWaitSetTimeout)
        this.isTopLoading = true
        this.topWaitSetTimeout = setTimeout(() => {
          this.isTopLoading = false;
          this.reachToppadding = 0;
        }, 1000);
      }
    }
  }
  scrollReachBottom(e){
    if(this.reachBottom&&e.deltaY>0){
      if(this.reachBottompadding<30){
        clearTimeout(this.bottomWaitSetTimeout)
        this.reachBottompadding++;
        this.bottomWaitSetTimeout = setTimeout(() => {
          this.reachBottompadding = 0;
        }, 500);
      }
      if(this.reachBottompadding>=30){
        clearTimeout(this.bottomWaitSetTimeout)
        if(this.bottomSetTimeout){
          clearTimeout(this.bottomSetTimeout)
        }
        this.isBottomLoading = true;
        if(this.flagEmit){
          this.afterReachBottom.emit();
          this.flagEmit = false;
        }
        if(this.isGetData){
          this.isBottomLoading = false;
          this.reachBottom = false;
          this.reachBottompadding = 0;
          this.isGetData = false
          this.isGetDataChange.emit(this.isGetData)
          this.flagEmit = true;
        }else{
          this.bottomSetTimeout = setTimeout(() => {
            this.isBottomLoading = false;
            this.reachBottom = false;
            this.reachBottompadding = 0;
            this.flagEmit = true
          }, 3000);
        }
        
      }
    }
  }
  checkScroll(dom){//检测竖直方向是否有滚动条
    return dom['scrollHeight']>dom['clientHeight']
  }
  checkScrollBar(handleClass){//如果用户没有指定容器滚动，就使用本身容器
    if(handleClass){
      return document.getElementsByClassName(handleClass)[0];
    }else{
      return this.pageContainer.nativeElement;
    }
  }
}
