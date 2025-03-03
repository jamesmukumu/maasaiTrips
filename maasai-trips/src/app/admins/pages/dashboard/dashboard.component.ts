import { Component,ViewChild,ElementRef,OnInit,inject } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  readonly snack = inject(MatSnackBar)
@ViewChild(MatMenuTrigger)menuTrigger!:MatMenuTrigger
emailChoosen:number = 1
choosenActive:any
processing = false
adminData:any
toogleSidenav = true
editAdminInfo = false
fullname = ''
email = ''
phoneNumber = ''

triggerSideNav(event:any){
this.toogleSidenav = event
}
async popDialog(){
  try{
    this.snack.open("Opening Editor...","Wait",{
    horizontalPosition:"center",
    verticalPosition:"bottom"
    })
  this.processing = true
  var {data}= await this.admin.fetchAdminsProfile()
  this.editAdminInfo = true
  this.fullname = data.userName
  this.email = data.Email
  this.phoneNumber = data.phoneNumber
  }catch(err){
  console.error(err)
  }
   
  
  }
triggerChoosen(event:any){
console.log(event)
var {activeNode,Name} = event
if(Name == 'Home'){
this.activeIndex = 0
}else if(Name == 'Account'){
  this.activeIndex = 6
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
break;
case "View Profile":
this.activeIndex = 6
break
case "Edit Profile":
this.popDialog()
break
case "Logout":
Cookies.remove("grant_token")
this.router.navigate(["/dashboard"])


}


}




constructor(private router:Router,private admin:AdminService){}
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
