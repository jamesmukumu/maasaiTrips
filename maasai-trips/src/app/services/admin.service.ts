import { Injectable } from '@angular/core';
import axios from 'axios';
export interface Register {
userName:string
password:string
Email:string
phoneNumber:String

}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor() { }


async Register(Reg:Register){
try{
var resp = await axios.post("http://localhost:8000/api/register/user",Reg)
return resp.data
}catch(err){
console.error(err)
}
}
async verifyEmail(tokenString:string){
try{
var resp = await axios.put("http://localhost:8000/api/verify/email",{},{
headers:{
"Authorization":"Bearer"+" "+tokenString
}
})
return resp.data
}catch(err){
console.error(err)
}
}
async login(credential:string,password:string){
try{
var resp = await axios.post("http://localhost:8000/api/login/user",{
"credential":credential,
"password":password
})
return resp.data
}catch(err){
console.error(err)
}

}



}
