import { Component,inject,OnInit } from '@angular/core';
import { AdminService,Register } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Cookies from 'js-cookie';
import {v5 as uuidv5} from 'uuid'

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers:[MessageService]
})
export class SignupComponent {
readonly snack  = inject(MatSnackBar)
userName:string = ''
password:string = ''
Email:string = ''
phoneNumber:string = ''
confirmPassword:string = ''
roleAdmin = ''
mismatchWarn:boolean = false
seePassword:boolean = false
processingRequest = false
acceptedAdminRoles = ["Marketing","Transport","Sales","Reservations"]
constructor(private activeRoute:ActivatedRoute,private admin:AdminService,private router:Router,private msg:MessageService){}
reg(){
this.processingRequest = true
var payload:Register = {
userName:this.userName,
password:this.password,
Email:this.Email,
phoneNumber:this.phoneNumber,
adminRoles:this.roleAdmin
}

this.admin.Register(payload).then((data)=>{

var {message,Content} = data
switch(message){
case "User Saved":
this.msg.add({life:100000,severity:"success",summary:"Success",detail:Content})
this.processingRequest= false
break;
case "Duplicacy Detected":
this.processingRequest = false
this.msg.add({life:10000,severity:"error","detail":"Email or phone Number already in use",summary:"Duplicacy detected"})
break;
}



})


}

checkerPassMatch(event:any){
if(this.password != this.confirmPassword){
this.mismatchWarn = true
}else{
this.mismatchWarn = false
}
}
goSignIn(){
this.router.navigate(["/login"])
}
toggleSee(){
this.seePassword = !this.seePassword
}


ngOnInit(){
var uniqueID  = uuidv5("http://localhost:4200/register",uuidv5.URL)


this.activeRoute.paramMap.subscribe((data)=>{
if(uniqueID != data.get('passkey')){
this.router.navigate(["/"])
}
})


}



}
