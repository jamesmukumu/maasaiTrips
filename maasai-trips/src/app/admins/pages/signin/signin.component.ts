import { Component,inject,OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {MatDialog} from "@angular/material/dialog"
import { RequestResetComponent } from '../../../components/request-reset/request-reset.component';
import Cookie from "js-cookie"
import Cookies from 'js-cookie';
import { Store } from '@ngrx/store';
import { saveSuperUser } from '../../../redux/actions/userStatus.action';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  providers:[MessageService]
})
export class SigninComponent  {
  readonly snack = inject(MatSnackBar)
  readonly dialog = inject(MatDialog)
  processingRequest = false
  credential = ''
  password = ''
  seePassword:boolean = false
  constructor(private store:Store,private admin:AdminService,private router:Router,private msg:MessageService){}

  ngOnInit(){
    var token = Cookie.get("grant_token")
    if(token){
      this.router.navigate(["/dashboard"])
    }else{
      this.router.navigate(["/login"])
    }
  }


  popRequest(){
   this.dialog.open(RequestResetComponent,{
    disableClose:true
   })
  }
login(){
  this.processingRequest = true
this.admin.login(this.credential,this.password).then((data:any)=>{
var {message} = data
switch(message){ 
  case "Credentials mismatch":
this.msg.add({severity:"error",life:10000,detail:"Invalid credentials"})
  this.processingRequest= false
  break;
  case "User does not have an account":
 
  this.msg.add({severity:"error",life:10000,detail:"User does not have an account"})
  this.processingRequest= false
  break;
  case 'Verification link approved and sent':
    this.processingRequest = false
    this.msg.add({severity:"success",life:10000,detail:"Email Verification sent to your address"})

    break
case "Successful Login":
this.store.dispatch(saveSuperUser({status:data.super}))
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

 
