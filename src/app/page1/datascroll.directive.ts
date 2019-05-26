import { Directive, ElementRef,HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDatascroll]'
})
export class DatascrollDirective {
  @Input() scrolltdy;
  @Output() changeData = new EventEmitter<any>();
  constructor(private el:ElementRef) { }
  loadMore(){
    let myArray = this.scrolltdy.concat(this.scrolltdy)
    this.changeData.emit(myArray)
  }
  @HostListener('scroll') onScroll() {
    if(this.el.nativeElement.scrollTop+this.el.nativeElement.clientHeight>=this.el.nativeElement.scrollHeight){
      this.loadMore()
      // console.log(this.scrolltdy)
    }
  }
}
