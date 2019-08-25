import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  items = []
  isGetData:boolean = false;
  page = 1;
  limit = 20;
  constructor(
    private service:ServiceService
  ){

  }
  ngOnInit(): void {
    this.service.getData(this.page,this.limit)
    .subscribe(res=>{
      this.items = res['data']
      this.page++;
    })
  }
  getData(){
    this.service.getData(this.page,this.limit)
    .subscribe(res=>{
      this.items = [...this.items,...res['data']]
      this.page++;
      this.isGetData = true;
    })
  }

}
