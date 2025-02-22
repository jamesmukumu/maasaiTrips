import { Component,inject,ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MailServService,newsLetter } from '../../../../services/mail/mail-serv.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'news-letter',
  templateUrl: './news-letter.component.html',
  styleUrl: './news-letter.component.css',
  providers:[MessageService]
})
export class NewsLetterComponent {
@ViewChild("dial")dialogCont = ElementRef

readonly snack = inject(MatSnackBar)
readonly dialog = inject(MatDialog)

constructor(private clip:Clipboard,private msg:MessageService,private mailer:MailServService){}   
message:string = ''
savingsNewsletter = false
titleNewsLetter:string = ''
previewContent:any
popDialog = false
ImageFile:any
choosen = false
uploadingCloud = false
cloudUrl = ''
choosenFile(event:any){
var {currentFiles} = event
console.log(currentFiles)
this.ImageFile = currentFiles[0]
this.choosen = true
}
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
  horizontalPosition:"center",
  verticalPosition:"bottom"
  })
  this.clip.copy(String(this.previewContent))
window.open("https://codebeautify.org/htmlviewer#","_blank")


}

async uploadCloudinry(){
this.uploadingCloud = true
try{
var resp = await this.mailer.uploadImage(this.ImageFile)
var {message,url} = resp
this.cloudUrl = url
if(message == 'Success'){

this.uploadingCloud = false
this.choosen = false
this.snack.open("Uploaded","SUCCESS",{
horizontalPosition:"center",
verticalPosition:"bottom"
})
this.popDialog = true
}else{
this.uploadingCloud = false
}
}catch(err){
console.error(err)
}
}



savingNewsletter(){
var refinedBody = this.message.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(http:\/\/res\.cloudinary\.com[^"']+)\1[^>]*>(.*?)<\/a>/gi, '<img src="$2" alt="$3" />')
this.savingsNewsletter = true
var load:newsLetter = {
Title:this.titleNewsLetter,
content:refinedBody
}
this.mailer.saveNewsLetter(load).then((data)=>{
var {message} = data
if(message != 'News Letter saved successfully'){
this.savingsNewsletter = false
this.snack.open("Something went wrong","Retry",{
verticalPosition:"bottom",
horizontalPosition:"center"
})
}else{
  this.snack.open(message,"success".toUpperCase(),{
    verticalPosition:"bottom",
    horizontalPosition:"center"
    }) 
}
}).catch((err)=>console.error(err))

}
}
