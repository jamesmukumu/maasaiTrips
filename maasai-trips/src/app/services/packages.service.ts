import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root'
})
export class PackagesService {
baseUrl:string = 'http://localhost:8000/api'
  constructor() { }

async addPackage(Payload:any){
try{
let token = Cookies.get("grant_token")
var formData = new FormData()
formData.append("packageTitle",Payload.title)
formData.append("packageAbout",Payload.about)
formData.append("packageOverview",Payload.overview)
formData.append("imagePackage",Payload.image)
formData.append("packageCharge",`${Payload.charges}`)
formData.append('packageChargeCurrency',Payload.chargeCurrency)
formData.append("startDate",Payload.startDate)
formData.append("endDate",Payload.endDate)
var resp = await axios.post(`${this.baseUrl}/create/new/package`,formData,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return resp.data
}catch(err){
return err
}}


async fetchMyPackages(){
try{
var token = Cookies.get("grant_token")
var resp = await axios.get(`${this.baseUrl}/fetch/my/packages`,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return resp.data
}catch(err){
return err
}
}


async deletePackage(id: any) {
  try {
    var token = Cookies.get('grant_token');
    var resp = await axios.delete(`${this.baseUrl}/delete/package`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id,
      },
    });
    return resp.data;
  } catch (err) {
    return err;
  }
}

async publishPackage(id: any) {
  try {
    var token = Cookies.get('grant_token');
    var resp = await axios.put(
      `${this.baseUrl}/publish/package`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
}

async un_publishPackage(id: any) {
  try {
    var token = Cookies.get('grant_token');
    var resp = await axios.put(
      `${this.baseUrl}/unpublish/package`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
}







}
