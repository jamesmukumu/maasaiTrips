import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';



@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
@ViewChild(MatMenuTrigger)menuTrigger!:MatMenuTrigger
emailChoosen:number = 1

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





}
