import { Component,inject } from '@angular/core';
import { AdminService,Register } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Cookies from 'js-cookie';


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
mismatchWarn:boolean = false
seePassword:boolean = false
processingRequest = false
constructor(private admin:AdminService,private router:Router,private msg:MessageService){}
reg(){
this.processingRequest = true
var payload:Register = {
userName:this.userName,
password:this.password,
Email:this.Email,
phoneNumber:this.phoneNumber
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

}
