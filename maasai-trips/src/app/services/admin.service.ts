import { Injectable } from '@angular/core';
import axios from 'axios';
export interface Register {
  userName: string;
  password: string;
  Email: string;
  phoneNumber: String;
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

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
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }
}
