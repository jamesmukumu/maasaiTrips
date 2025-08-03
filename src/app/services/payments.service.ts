import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie'

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
async initializePayment(load:any,id:any){
try{
let payload = {
"first_name":load.first_name,
"last_name":load.last_name,
"email":load.email
}
let response = await axios.post(`http://localhost:8000/api/create/payment/${id}`,payload)
let token = response.headers['authorization']
Cookies.set("Payment",token.split("Bearer ")[1])
return response.data
}catch(err){
return err
}
}

async verifyPayment(){
try{
let token = Cookies.get('Payment')
let response = await axios.post("http://localhost:8000/api/verify/payment",{},{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
}catch(err){
return err
}
}



  constructor() { }
}
