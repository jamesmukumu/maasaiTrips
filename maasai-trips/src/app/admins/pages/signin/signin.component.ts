import { Component,inject } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  providers:[MessageService]
})
export class SigninComponent {
  readonly snack = inject(MatSnackBar)
  processingRequest = false
  credential = ''
  password = ''
  seePassword:boolean = false
  constructor(private admin:AdminService,private router:Router,private msg:MessageService){}

login(){
  this.processingRequest = true
this.admin.login(this.credential,this.password).then((data)=>{
var {message} = data
switch(message){
  case "Credentials mismatch":
this.msg.add({severity:"error",life:10000,detail:"Invalid credentials"})
  this.processingRequest= false
  break;
  case "User does not have an account":
  this.processingRequest = false
  this.msg.add({severity:"error",life:10000,detail:"User does not have an account"})
  this.processingRequest= false
  break;

  // handle login to redirect
  }
})
}


signUp(){
this.router.navigate(["/register"])
}
  toggleSee(){
    this.seePassword = !this.seePassword
    }
}


