import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService, Register } from '../../../services/admin.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'manageadmins',
  templateUrl: './manageadmins.component.html',
  styleUrl: './manageadmins.component.css',
  providers:[MessageService]
})
export class ManageadminsComponent {
constructor(private admin:AdminService,private message:MessageService){}
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
selectedId:any
password:any
popAdminUpdate(element:any){


this.editUser = true
this.userIdSelected = element.id
this.fullname = element.userName
this.email = element.Email
this.emailVerificationStatus = element.emailVerified
this.phoneNumber = element.phoneNumber
this.roleAdmin = element.adminRoles
}
updating = false
completeUpdate(){
this.updating = true
let register:Register= {
password:this.password,
userName:this.fullname ?? "",
Email:this.email ?? "",
phoneNumber:this.phoneNumber ?? "",
adminRoles:this.roleAdmin ?? ""
}
this.admin.updateAdmin(register,this.userIdSelected).then((data:any)=>{
var {message} = data
if(message === "Admin Updated"){
  this.message.add({
    severity:"success",
    detail:message,
    sticky:true
  })
this.updating = false
this.editUser = false
this.fetchAdmins()
}else{
  this.message.add({
    severity:"error",
    detail:message,
    sticky:true
  })
this.updating = false
this.editUser = false
}
}).catch((err)=>{
console.error(err)
this.editUser = false
this.message.add({
  severity:"error",
  detail:"Something has gone wrong",
  sticky:true
})
})
}
// bindDropDown(event:any){
// console.log(event)
// }

popAdminDelete(element:any){
  
  this.deleteUser = true
  this.fullname = element.userName
  this.email = element.Email
  this.userIdSelected = element.id
  this.emailVerificationStatus = element.emailVerified
  }

  confirmDeletion(){
    
    this.admin.deleteAdmin(this.userIdSelected).then((data:any)=>{
     if(data.message === "Deleted Successfully"){
      this.message.add({severity:"success",detail:"Admin Deleted",sticky:true})
      this.fetchAdmins()
     }
    }).catch((err:any)=>{
      console.error(err)
    })
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



handleToggle(element:any,event:any){
var {id} = element
if(event.checked){
this.processing = true
this.admin.makeSuperUser(id).then((data:any)=>{
let {message} = data
if(message === 'status updated'){
this.message.add({
severity:"success",
detail:message,
sticky:true
})
this.fetchAdmins()
}
}).catch((err)=>{
console.error(err)
return err
})
}else{
this.processing = true
// unmake super user
this.admin.un_makeSuperUser(id).then((data:any)=>{
  let {message} = data
  if(message === 'status updated'){
  this.message.add({
  severity:"success",
  detail:message,
  sticky:true
  })
  this.fetchAdmins()
  }
  }).catch((err)=>{
  console.error(err)
  return err
  })
}
}
}
