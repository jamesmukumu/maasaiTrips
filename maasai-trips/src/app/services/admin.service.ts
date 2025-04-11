import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';
export interface Register {
  userName: string;
  password: string;
  Email: string;
  phoneNumber: string;
  adminRoles: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  async findAllUsers() {
    try {
      var token = Cookies.get('grant_token');
      var response = await axios.get(
        'https://maasaitrips-2.onrender.com/api/see/all/users',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }

  async Register(Reg: Register) {
    try {
      var resp = await axios.post(
        'https://maasaitrips-2.onrender.com/api/register/user',
        Reg
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }
  async verifyEmail(tokenString: string) {
    try {
      var resp = await axios.put(
        'https://maasaitrips-2.onrender.com/api/verify/email',
        {},
        {
          headers: {
            Authorization: 'Bearer' + ' ' + tokenString,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }
  async completeReset(Token: string, password: string, completePass: string) {
    try {
      var resp = await axios.put(
        'https://maasaitrips-2.onrender.com/api/reset/password',
        {
          password: password,
          confirmPassword: completePass,
        },
        {
          headers: {
            Authorization: 'Bearer' + ' ' + Token,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }
  async requestResets(Email: string) {
    try {
      var resp = await axios.post(
        'https://maasaitrips-2.onrender.com/api/request/reset',
        {
          Email: Email,
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }
  async login(credential: string, password: string) {
    try {
      var resp = await axios.post(
        'https://maasaitrips-2.onrender.com/api/login/user',
        {
          credential: credential,
          password: password,
        }
      );

      var { authorization } = resp.headers;
      if (resp.data.message == 'Successful Login') {
        Cookies.set('grant_token', authorization, { expires: 1 / 24 });
      }
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async fetchAdminsProfile() {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.get(
        'https://maasaitrips-2.onrender.com/api/fetch/user/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }




  async makeSuperUser(id:any){
  try{
   var token =  Cookies.get("grant_token")
   var response = await axios.put("http://localhost:8000/api/make/super/user",{},{
    params:{
      "id":id
    },
    headers:{
     "Authorization":`Bearer ${token}`
    }
   })
   return await response.data
  }catch(err){
   return err
  }

  }
}
