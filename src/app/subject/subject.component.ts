import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Subject, BehaviorSubject  } from 'rxjs';
import { take, debounceTime, map,takeUntil,merge, concat,startWith, switchMap, mapTo, scan, tap, mergeMap } from 'rxjs/operators';
import { Observable,pipe,from } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.less']
})
export class SubjectComponent implements OnInit {
  constructor(private http:HttpClient) { }

  ngOnInit() {
    let count = 0;
    let btn1 = document.querySelector(".demo1")
    let mynumber = 0;
    let btn2 = document.querySelector(".demo2");
    let tdy = fromEvent(btn1,'click')
    .pipe(switchMap(x=>{
      return this.http.get('http://localhost:8000/getdata?page='+1+"&limit="+10)
    }))
    tdy.subscribe(res=>console.log(res))
    // var source = interval(1000).pipe(take(3));
    // var observerA = {
    //   next: value => console.log('A next: ' + value),
    //   error: error => console.log('A error: ' + error),
    //   complete: () => console.log('A complete!')
    // }
    // var observerB = {
    //   next: value => console.log('B next: ' + value),
    //   error: error => console.log('B error: ' + error),
    //   complete: () => console.log('B complete!')
    // }
    // var subject = new Subject()
    // subject.subscribe(observerA)
    // source.subscribe(subject);
    // setTimeout(() => {
    //   subject.subscribe(observerB);
    // }, 1000);


  }

}
