import { Component,OnInit,ViewChild,inject } from '@angular/core';
import { MailServService,MailTemplate } from '../../../../services/mail/mail-serv.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'manage-mails',
  templateUrl: './manage-mails.component.html',
  styleUrl: './manage-mails.component.css',
  providers:[MessageService]
})
export class ManageMailsComponent {
  readonly snack = inject(MatSnackBar)
displayedColumns:string[] = [ "createdon","subject","attachments","actions"]
processing = false
dataSource:any
idSelected:number = 0
deleting = false
subject =''
updating = false
subj = ''
messageEdit = ''
constructor(private mail:MailServService,private msg:MessageService){}
@ViewChild(MatPaginator) paginator!:MatPaginator

timeFormater(time:string){
  return new Date(time).toString()
  }
  logger(event:any){
  var {args} = event
  this.messageEdit = args[0]
  }
  
async updatingMailer(){
try{
this.updating = false
this.processing = true
var payload:MailTemplate = {
  subject:this.subj,
  mailMessage:this.messageEdit
}
var {message} =  await this.mail.updateMailTemplate(payload,this.idSelected)
if(message == 'Template Updated'){
  this.snack.open("Templated updated","UPDATED",{
    horizontalPosition:"center",
    verticalPosition:"bottom"
  })
  this.FetchMails()
}else{
this.msg.add({severity:"error",detail:"Something went wrong during update",life:10000})
}


}catch(err){
console.log(err)
}
}

popUpdate(subject:string,id:number,initialMsg:string){
this.updating = true
this.subj = subject
this.idSelected = id
this.messageEdit = initialMsg
}



  popDelete(id:number,subject:string){
  this.deleting = true
  this.idSelected = id  
  this.subject = subject
}
async delete(){
this.processing = true
this.deleting = false
try{
var {message} = await this.mail.deleteTemplate(this.idSelected)
if(message == 'Deleted'){
this.snack.open("Delete","success".toUpperCase(),{
horizontalPosition:"center",
verticalPosition:"bottom"
})
this.FetchMails()
}else{
this.msg.add({severity:"error",detail:"Somethin went wrong",life:10000})
}
}catch(err){
console.error(err)
}

}
  async FetchMails(){
  this.processing = true
  try{
  var {message,data} =await this.mail.fetchEmailTemplates()
  this.dataSource = new MatTableDataSource(data)
  this.dataSource.paginator = this.paginator
  this.processing = false
  }catch(err){
  console.error(err)
  }
  }
  ngOnInit(){
  this.FetchMails()
  }

}
