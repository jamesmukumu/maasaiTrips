import { Component,OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent  implements OnInit{
constructor(private admin:AdminService){}
adminData:any
processing = false


formatter(dateTime:string){
return new Date(dateTime).toLocaleString()
}
ngOnInit(){
this.processing = true
this.admin.fetchAdminsProfile().then((dataa:any)=>{
this.processing = false
var {data} = dataa
this.adminData = data
})
}
}
