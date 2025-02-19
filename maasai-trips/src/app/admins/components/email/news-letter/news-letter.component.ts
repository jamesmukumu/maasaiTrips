import { Component,inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MailServService } from '../../../../services/mail/mail-serv.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'news-letter',
  templateUrl: './news-letter.component.html',
  styleUrl: './news-letter.component.css',
  providers:[MessageService]
})
export class NewsLetterComponent {
  readonly snack = inject(MatSnackBar)
 constructor(private clip:Clipboard,private msg:MessageService,private mailer:MailServService){}   
message:string = ''
previewContent:any
 captureMessage(event:any){
  var {htmlValue} = event
  console.log(htmlValue)
  this.message = htmlValue
  }
async preview(){
this.previewContent = await this.mailer.previewLive(this.message)
this.snack.open("Redirecting...","",{
horizontalPosition:"left",
verticalPosition:"top"
})
this.snack.open("Copied","Success",{
  horizontalPosition:"left",
  verticalPosition:"top"
  })
  this.clip.copy(this.previewContent)
window.open("https://codebeautify.org/htmlviewer#","_blank")


}



}
