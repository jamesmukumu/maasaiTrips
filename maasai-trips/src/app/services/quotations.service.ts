import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface Quotations {
  firstName: string;
  lastName: string;
  email: string;
  roomsCount: number;
  startStayDate: string;
  endStayDate: string;
  phoneNumber: string;
  adultsCount: number;
  childrenCount: number;
  travelDescription: string;
  kidsAges: string;
}
@Injectable({
  providedIn: 'root',
})
export class QuotationsService {
  constructor() {}

  async saveQuotation(Quote: Quotations) {
    try {
      var resp = await axios.post(
        'https://maasaitrips-2.onrender.com/api/save/quote',
        Quote
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  async updateEnquiry(Payload: Quotations) {
    try {
      var resp = await axios.put(
        'https://maasaitrips-2.onrender.com/api/update/enquiry',
        Payload
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteEnquiry(email: string) {
    try {
      var resp = await axios.delete(
        'https://maasaitrips-2.onrender.com/api/delete/enquiry',
        {
          params: {
            email: email,
          },
          // h
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  async fetchQuotations() {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.get(
        'https://maasaitrips-2.onrender.com/api/fetch/enquiries',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }
}
