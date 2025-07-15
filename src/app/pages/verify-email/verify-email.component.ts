import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';  
import Cookies from 'js-cookie';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
  providers:[MessageService]
})
export class VerifyEmailComponent implements OnInit{
constructor(private router:Router,private route:ActivatedRoute,private msg:MessageService,private admin:AdminService){}



tokenString:string = ''
verify(){
  this.admin.verifyEmail(this.tokenString).then((data)=>{
  if(data == "Updated successfully"){
    this.msg.add({severity:"success",detail:"Account Verified",life:10000})
    Cookies.set("grant_token",this.tokenString,{expires:1/24})
    setInterval(()=>this.router.navigate(["/dashboard"]),1200)
  }else{
    this.msg.add({severity:"error",detail:data.messaga||data})
  }

  })
  }



ngOnInit(){
this.route.paramMap.subscribe((routePath)=>{
this.tokenString = routePath.get("token") ?? ''
})
this.verify();
}
}
