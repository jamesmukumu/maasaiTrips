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
displayedColumns = ["created_at","name","email","super","emailVerified","actions"]
dataSource:any
processing = false



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
