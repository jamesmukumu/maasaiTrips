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
choosenActive:any

triggerChoosen(event:any){

var {activeNode,Name} = event
if(Name == 'Home'){
this.activeIndex = 0
}
switch(activeNode){
case "Create Email":
this.activeIndex = 1
this.emailChoosen = 2
break
case "Send Email":
this.activeIndex = 1
this.emailChoosen = 1
break;
case "Send Bulk":
  this.activeIndex = 1
  this.emailChoosen = 3
  break
  case "Create Newsletter":
    this.activeIndex = 1
  this.emailChoosen = 4
  break
  case "Show queue":
  this.activeIndex = 1
  this.emailChoosen = 5
break
case "Manage Mails":
this.activeIndex = 1
this.emailChoosen =  6
break
case 'Manage Promotional newsletters':
  this.activeIndex = 1
  this.emailChoosen = 8
  break
case 'Manage newsletters':
  this.activeIndex = 1
this.emailChoosen =  7
break
case "Home":
  this.activeIndex = 0



}


}




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
