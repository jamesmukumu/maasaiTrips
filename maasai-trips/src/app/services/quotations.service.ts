import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Quotations {
  firstName:string
  lastName:string
  email:string
  roomsCount:number
  startStayDate:string
  endStayDate:string
  phoneNumber:string
  adultsCount:number
  childrenCount:number
  travelDescription:string
  kidsAges:string
  }
@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
constructor() { }

async saveQuotation(Quote:Quotations){
try{
var resp = await axios.post("http://localhost:8000/api/save/quote",Quote)
return resp.data
} catch(err){
console.error(err)
} 
}


async updateEnquiry(Payload:Quotations){
try{
var resp = await axios.put("http://localhost:8000/api/update/enquiry",Payload)
return resp.data
}catch(err){
console.log(err)
}


}

async deleteEnquiry(email:string){
try{
var resp = await axios.delete("http://localhost:8000/api/delete/enquiry",{
params:{
"email":email
}
})
return resp.data
}catch(err){
console.error(err)
}

}


async fetchQuotations(){
try{
var resp = await axios.get("http://localhost:8000/api/fetch/enquiries")
return resp.data
  }catch(err){
console.error(err)
  }
}
}
