import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http:HttpClient) { }
  getData(page,limit){
    let obj = {
      page:page,
      limit:limit
    }
    return this.http.get("http://192.168.199.215:5000/getdata",{params:obj})
  }
}
