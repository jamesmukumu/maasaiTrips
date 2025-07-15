import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  providers:[MessageService]
})
export class ResetPasswordComponent {
password = ''
confirmPassword = ''
processingRequest = false
token = ''
constructor(private route:Router,private router:ActivatedRoute,private admin:AdminService,private msg:MessageService){}
seePassword:boolean = false
toggleSee(){
  this.seePassword = !this.seePassword
  }
completeReset(){
this.processingRequest = true
this.admin.completeReset(this.token,this.password,this.confirmPassword).then((data)=>{
var {message} = data
if(message != 'Password updated successfully'){
this.msg.add({severity:"error",detail:message,life:9900})
this.processingRequest = false
}else{
this.msg.add({severity:"success",detail:"Password changed"})
setInterval(()=>{
this.route.navigate(['/login'])
},1700)
}

})
}

ngOnInit(){
this.router.paramMap.subscribe((data)=>{
this.token = data.get("token") ?? ''
})
}

}
