import { Component,OnInit,inject } from '@angular/core';
import { MailServService,BulkMailUser } from '../../../../services/mail/mail-serv.service';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-bulk',
  templateUrl: './delete-bulk.component.html',
  styleUrl: './delete-bulk.component.css',
  providers:[MessageService]
})
export class DeleteBulkComponent {
readonly dialog = inject(MatDialog)
constructor(private store:Store,private mailer:MailServService,private msg:MessageService){}
idUser:any
readonly snack = inject(MatSnackBar)

async delete(){
this.snack.open("Deleting......","Wait",{

})
try{
var response  = await this.mailer.deleteBulk(this.idUser)
var {message} = response
if(message == 'Deleted'){
this.msg.add({severity:"success",detail:"Deleted",life:10000})
this.snack.dismiss()
this.dialog.closeAll()
}else{
this.msg.add({severity:"error",detail:message,life:10000}) 
this.dialog.closeAll()
}
}catch(err){
console.error(err)
}
}
ngOnInit(){
this.store.subscribe((data:any)=>{
var {bulks} = data
var deleteData = JSON.parse(bulks)
var {id} = deleteData 
this.idUser = id
}
)
}
}