import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent, forkJoin, zip, of, Subject, combineLatest } from 'rxjs';
import { filter, distinct, scan, map, pairwise, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import _ from 'lodash';
@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.less']
})
export class Page3Component implements OnInit {
  constructor(private http:HttpClient) {
    
  }
  @ViewChild("container") containerChild:ElementRef;
  @Input()listheight = 700
  @Input()listitemheight = 30
  listitemcount = 0;
  page = 1;
  limit = 0;
  offset = 0;
  items = []

  ngOnInit() {
    let page$ = new Subject()
    let page1$ = page$.pipe(pairwise())
    page$.next(this.page)
    // let content = document.getElementsByClassName("container")[0]
    this.limit = Math.ceil(this.listheight/this.listitemheight)
    this.listitemcount = this.limit*2;
    this.http.get(`http://localhost:8000/getdata?offset=${this.offset}&limit=${this.listitemcount}`).subscribe(res=>{
        if(res['code']==0){
          this.items = res['data']
          this.offset = res['offset']
          this.page+=2;
          page$.next(this.page)
        }
      })
    //页码的流
    let pageSouce$ = fromEvent(this.containerChild.nativeElement,"scroll")
    .pipe(map(item=>item['srcElement']['scrollTop']))
    .pipe(distinct())
    .pipe(map(item=>Math.ceil(item/this.listheight)),distinct(),filter(item=>item!=0))
    // .subscribe(res=>{
    //   console.log(res)
    // })
    // let getData$ = pageSouce$.pipe(mergeMap(event=>{
    //   this.page = event;
    //   console.log(event)
    //   return this.http.get("http://localhost:8000/getdata?page="+(event+1)+"&limit="+this.limit)
    // }))
    // getData$.subscribe(res=>{
    //   console.log(res)
    //   if(res['code']==0){
    //     this.items = _.concat(this.items,res['data'])
    //     console.log(this.items)
    //   }
    // })
    // this.http.get("http://localhost:8000/getdata?page="+this.page+"&limit="+this.limit).subscribe(res=>{
    //   if(res['code']==0){
    //     this.listitemcount = res['count']
    //     this.items = res['data']
    //   }
    // })
    console.log(this.containerChild.nativeElement.scrollHeight)
    console.log(this.containerChild.nativeElement.clientHeight)
    this.http.get("http://localhost:8000/getalldata").subscribe(res=>{
      if(res['code']==0){
        // this.listitemcount = res['count']
        // this.items = res['data']
      }
    })
    let pagedirection$ = fromEvent(this.containerChild.nativeElement,"scroll")
    .pipe(map(item=>item['srcElement']["scrollTop"]))
    .pipe(pairwise())
    .pipe(map(item=>{
      if(item[1]>item[0]){
        return 1;//下拉
      }else if(item[1]<item[0]){
        return -1;//上划
      }
    }))
    let pagescroll$ = fromEvent(this.containerChild.nativeElement,"scroll")
    .pipe(map(item=>{
      return {
        scrollTop:item['srcElement']['scrollTop'],
        clientHeight:item['srcElement']['clientHeight'],
        scrollHeight:item['srcElement']['scrollHeight']
      }
    }))
    .pipe(pairwise())
    // pagescroll$.pipe(mergeMap(item=>pagedirection$)).subscribe(res=>console.log(res))
    // pagedirection$.pipe(mergeMap(item=>pagescroll$)).subscribe(res=>console.log(res))
    combineLatest(pagescroll$,pagedirection$,page$).subscribe(res=>{
      console.log(res)
      
      if(res[0][1]['scrollTop']>(res[0][1]['clientHeight']/2)&&res[1]==1){
        // console.log(res)
        this.http.get(`http://localhost:8000/getdata?limit=${Math.ceil(this.limit/2)}&offset=${this.offset}`).subscribe(res=>{
          if(res['code']==0){
            // return res;
            this.items = _.concat(this.items,res['data'])
            this.items = _.drop(this.items,res['data'].length)
            this.page+=0.5
            
            page$.next(this.page)
          }
        })
      }else if(res[1]==-1){

      }
    })
  }
  domore(page,limit){
    this.http.get(`http://localhost:8000/getdata?page=${page}&limit=${limit}`).subscribe(res=>{
      if(res['code']==0){
        return res;
      }
    })
  }
  isEmpty(target){
    if(!target['clientHeight']){
      return true
    }else{
      return false;
    }
  }
  isEnd(target){
    if(target['screenTop']+target['clientHeight']+20>target['scrollHeight']){
      return true;
    }
    return false;
  }
}
