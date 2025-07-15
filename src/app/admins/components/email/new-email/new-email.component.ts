import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MailServService,MailTemplate } from '../../../../services/mail/mail-serv.service';

import { VideoHandler, ImageHandler, Options } from 'ngx-quill-upload';
@Component({
  selector: 'new-email',
  templateUrl: './new-email.component.html',
  styleUrl: './new-email.component.css',
  providers:[MessageService]
})
export class NewEmailComponent {


  
  
constructor(private msg:MessageService,private mailer:MailServService){}
processingRequest = false
subject = ''
message = ''
choosenCSV:any
captureMessage(event:any){
var {args} = event

this.message = args[0]
}
captureEmailTemplateCSV(event:any){
this.choosenCSV = event.currentFiles[0]
}

uploadCSV(){
this.mailer.uploadCSVTemplates(this.choosenCSV).then((data)=>{
 var {message} = data 
 if(message == "Mail Templates Saved"){
  this.msg.add({severity:"success",detail:"Mail Templates Added",life:15000})
 }else{
  this.msg.add({severity:"error",detail:"Something Went Wrong"})
 }
})
}
savingTemplate(){
this.processingRequest = true
var payload:MailTemplate = {
subject:this.subject,
mailMessage:this.message
}
this.mailer.saveEmailTemplate(payload).then((data)=>{
var {message} = data
if(message != "Email template Saved"){
this.processingRequest = false
this.msg.add({severity:"error",detail:message,life:10000})
}else{
this.message = ''
this.subject = ''
this.processingRequest = false
this.msg.add({severity:"success",detail:"Email Template saved",life:10000})
}
})

}

}
