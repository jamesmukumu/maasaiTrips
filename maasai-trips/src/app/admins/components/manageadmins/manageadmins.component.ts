import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'manageadmins',
  templateUrl: './manageadmins.component.html',
  styleUrl: './manageadmins.component.css'
})
export class ManageadminsComponent {
constructor(private admin:AdminService){}
displayedColumns = ["created_at","name","email","phone","roleAdmin","super","emailVerified","actions"]
dataSource:any
processing = false
editUser = false
deleteUser = false
userIdSelected?:number
fullname?:string
email?:string
phoneNumber?:string
emailVerificationStatus?:boolean
roleAdmin?:string


validEmailStatus = [
  {
  "status":false,
  "label":"Unverified"
  },
  {
    "status":true,
    "label":"Verified"
    },
]

acceptedAdminRoles = ["Marketing","Transport","Sales","Reservations"]

popAdminUpdate(element:any){


this.editUser = true
this.fullname = element.userName
this.email = element.Email
this.emailVerificationStatus = element.emailVerified
this.phoneNumber = element.phoneNumber
this.roleAdmin = element.adminRoles
}

bindDropDown(event:any){
console.log(event)
}

popAdminDelete(element:any){
  
  this.deleteUser = true
  this.fullname = element.userName
  this.email = element.Email
  this.emailVerificationStatus = element.emailVerified
  }
formater(dateTime:any){
return new Date(dateTime).toDateString()
}
async fetchAdmins(){
try{
  this.processing = true
var {data} = await this.admin.findAllUsers()
this.dataSource = new MatTableDataSource(data)
this.processing = false
}catch(err){
console.error(err)
}

}




ngOnInit(){
this.fetchAdmins()
}
}
