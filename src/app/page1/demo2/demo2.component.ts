import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject,merge, EMPTY, fromEvent } from 'rxjs';
import { startWith, tap, take, takeUntil, map, mergeMap, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.less']
})
export class Demo2Component implements OnInit {
  public listData = []
  public allListData = []
  public option = {
    page:1,
    limit:10
  }
  constructor(private http:HttpClient) { }

  ngOnInit() {

    const subject = new Subject();
    let container = document.querySelector(".container")
    let scrollup = fromEvent(container,"scroll")
    this.http.get('http://localhost:8000/getdata?page='+this.option.page+"&limit="+this.option.limit)
    .subscribe(res=>{
      this.allListData = res['data']
      this.listData = this.allListData;
    })
    let tdy = fromEvent(container,"scroll")
    .pipe(
      switchMap(res=>{
        if(res['target']['scrollTop']+res['target']['clientHeight']>=res['target']['scrollHeight']){
          this.option.page++
          console.log("下拉",this.option.page)
        }else if(res['target']['scrollTop']<=0){
          console.log("上划",this.option.page)
          this.option.page--
        }
        return this.http.get('http://localhost:8000/getdata?page='+this.option.page+"&limit="+10)
      })
    )
    tdy.pipe(debounceTime(50))
    .subscribe(res=>{
      // this.allListData = res['data'];
      // this.listData = this.listData.concat(this.allListData)
      this.listData = res['data']
    })
  }

}
