import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MessageService } from 'primeng/api';
import { MailServService,Mail } from '../../../services/mail/mail-serv.service';



@Component({
  selector: 'emails-send',
  templateUrl: './emails-send.component.html',
  styleUrl: './emails-send.component.css',
  providers:[MessageService]
})
export class EmailsSendComponent {
constructor(private mailer:MailServService,private msg:MessageService){}
  ccCopies: string[] = [];
  targetMail = ''
  subjectEmail = ''
  message= ''
  actualCC:string = ''
  attachments = []
  processingEmail = false

choosenFile(event:any){
var {currentFiles} = event
this.attachments = currentFiles
console.log(this.attachments)
}
captureMessage(event:any){
var {htmlValue} = event
this.message = htmlValue
}
sendingEmail(){
this.processingEmail = true
let payload:Mail =  {
message:this.message,
subject:this.subjectEmail,
attachment:this.attachments,
emailTarget:this.targetMail,
ccs:this.ccCopies.join(",")
}
this.mailer.saveEmail(payload).then((dataa)=>{
var {message} = dataa
if(message == "Email sent"){
  this.processingEmail = false
this.msg.add({severity:"success",detail:"Email propagated",life:10000})
}else{
this.msg.add({severity:"error",detail:message,life:10000})
this.processingEmail = false 
}


})

}

  addCC(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.ccCopies.push(value);
    }
    event.chipInput!.clear();
  }

  removeCC(chip: string): void {
    const index = this.ccCopies.indexOf(chip);
    if (index >= 0) {
      this.ccCopies.splice(index, 1);
    }
  } 
}
