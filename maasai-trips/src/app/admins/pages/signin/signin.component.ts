import { Component,inject } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {MatDialog} from "@angular/material/dialog"
import { RequestResetComponent } from '../../../components/request-reset/request-reset.component';
import Cookie from "js-cookie"




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  providers:[MessageService]
})
export class SigninComponent {
  readonly snack = inject(MatSnackBar)
  readonly dialog = inject(MatDialog)
  processingRequest = false
  credential = ''
  password = ''
  seePassword:boolean = false
  constructor(private admin:AdminService,private router:Router,private msg:MessageService){}


  popRequest(){
   this.dialog.open(RequestResetComponent,{
    disableClose:true
   })
  }
login(){
  this.processingRequest = true
this.admin.login(this.credential,this.password).then((data)=>{
var {message,token} = data
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
case "Successful Login":
Cookie.set("grant_token",token,{expires:60/56400})
this.router.navigate(["/dashboard"])
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


