import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
@ViewChild(MatMenuTrigger)menuTrigger!:MatMenuTrigger
emailChoosen:number = 1
constructor(private router:Router){}
chooserEmail(choosenOptionEmail:number){
this.emailChoosen = choosenOptionEmail
}
activeIndex = 0 
changeActive(activeIndex:number){
this.activeIndex = activeIndex
}
openMenu(event:MouseEvent,trigger:any){
event.stopPropagation()
trigger.openMenu()
}


ngOnInit(){
var token = Cookies.get("grant_token")
if(token == undefined || token == ''){
this.router.navigate(["/login"])
}
}


}
