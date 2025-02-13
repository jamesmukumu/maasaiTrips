import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';


export interface MailTemplate{
subject:string
mailMessage:string
attachments?:any
}
export interface Mail{
message:string
emailTarget:string
subject:string
attachment:any
ccs?:string
}
@Injectable({
  providedIn: 'root'
})
export class MailServService {
constructor() { }
async saveEmail(Mail:Mail){
var token = Cookies.get("grant_token") 
try{
var formData = new FormData()
formData.append("message",Mail.message)
formData.append("subject",Mail.subject)
formData.append("emailTarget",Mail.emailTarget)
if(Mail.attachment.length && Mail.attachment){
  for(let file of Mail.attachment){
    formData.append("attachment",file)
    }
}

formData.append("ccs",Mail.ccs??"");


var resp = await axios.post("http://localhost:8000/api/send/email",formData,{
headers:{
"Content-Type":"multipart/form-data"
}
})
return resp.data
}catch(err){
console.error(err)
}
}



async saveEmailTemplate(Temp:MailTemplate){
try{
var token = Cookies.get("grant_token") ?? ''
var resp = await axios.post("http://localhost:8000/api/save/email/template",Temp,{
headers:{
"Authorization":"Bearer"+" "+token
}
})
return resp.data
}catch(err){
console.error(err)
}


}


}
