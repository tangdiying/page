import { CanDeactivate } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Demo1Component } from './page1/demo1/demo1.component';
export class LeaveGuard implements CanDeactivate<Demo1Component> {
 
    canDeactivate (component: Demo1Component) {
 
    	let loggedIn: boolean = Math.random() < 0.5;
    	console.log(component) // componrnt为 routerguard.component的内容 可获得其变量
        // return window.confirm("确定要离开吗");
        return window.confirm("确定要离开吗");
    }
}