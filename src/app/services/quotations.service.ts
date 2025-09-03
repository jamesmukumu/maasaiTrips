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

  async saveQuotation(Quote: any) {
    try {
      var resp = await axios.post(
        'https://maasai-trips.laravel.cloud/api/save/quote',
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
        'https://maasai-trips.laravel.cloud/api/update/enquiry',
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
        'https://maasai-trips.laravel.cloud/api/delete/enquiry',
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
        'https://maasai-trips.laravel.cloud/api/fetch/enquiries',
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

  async markEnquiry(id: any, status: any) {
    try {
      let token = Cookies.get('grant_token');
      let response = await axios.post(
        `https://maasai-trips.laravel.cloud/api/toggle/enquiry/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: `${id}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
}
