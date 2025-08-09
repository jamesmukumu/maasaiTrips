import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class OnboardingsService {

  constructor() { }
baseUrl = `https://maasai-trips.laravel.cloud/api`

async saveOnboarding(Payload:any){
try{
let response = await axios.post(`${this.baseUrl}/create/new/onboarding`,Payload,{
headers:{
"Authorization":`Bearer ${Cookies.get("grant_token")}`
}
})
return response.data
}catch(err){
return err
}


}


}
