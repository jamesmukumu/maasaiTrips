import { Component,inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'request-reset',
  templateUrl: './request-reset.component.html',
  styleUrl: './request-reset.component.css',
  providers:[MessageService]
})
export class RequestResetComponent {
email:string = ''
readonly dialog = inject(MatDialog)
processingRequest = false
constructor(private admin:AdminService,private msg:MessageService){}
processRequest(){
this.processingRequest = true
this.admin.requestResets(this.email).then((data)=>{
var {message} = data
if(message == 'Email Non existent'){
this.processingRequest = false
this.msg.add({severity:"error",detail:"Email does not exist",life:10000})
}else if(message == 'Reset link sent'){
this.processingRequest = false
this.msg.add({severity:"success",detail:"Reset link sent to email address",life:13500})

}

})
}




}
