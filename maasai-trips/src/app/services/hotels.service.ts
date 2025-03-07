import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import axios from 'axios';
export interface Hotel {
  hotelName: string;
  thumbnail: any;
  destinations_id: number;
  hotelDescription: string;
  hotelMetaDescription: string;
  hotelCancellationPolicy: string;
  minimumRoomRate: number;
  maximumRate: number;
  hotelCommission: number;
  locationDescription: string;
  contactEmail: string;
  contactPhoneNumber: string;
  contactPerson: string;
  images: any[];
}

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  constructor() {}
  baseUrl = 'https://maasaitrips-2.onrender.com/api';

  async saveHotel(hotel: Hotel) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      for (let i = 0; i < hotel.images.length; i++) {
        var keysHotel = Object.keys(hotel.images[i]);
        var valuesHotel: any = Object.values(hotel.images[i]);
        for (let j = 0; j < keysHotel.length; j++) {
          formData.append(keysHotel[j], valuesHotel[j]);
        }
      }
      formData.append('locationDescription', hotel.locationDescription);
      formData.append('contactEmail', hotel.contactEmail);
      formData.append('contactPhoneNumber', hotel.contactPhoneNumber);
      formData.append('contactPerson', hotel.contactPerson);
      formData.append('hotelCommission', `${hotel.hotelCommission}`);
      formData.append('destinations_id', `${hotel.destinations_id}`);
      formData.append('maximumRate', `${hotel.maximumRate}`);
      formData.append('minimumRoomRate', `${hotel.minimumRoomRate}`);
      formData.append(
        'hotelCancellationPolicy',
        `${hotel.hotelCancellationPolicy}`
      );
      formData.append('hotelMetaDescription', hotel.hotelMetaDescription);
      formData.append('hotelDescription', hotel.hotelDescription);
      formData.append('hotelName', hotel.hotelName);
      formData.append('thumbnail', hotel.thumbnail);

      var resp = await axios.post(`${this.baseUrl}/add/new/hotel`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async fetchMyHotels() {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.get(`${this.baseUrl}/fetch/my/hotels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }
  async fetchDestinations() {
    var token = Cookies.get('grant_token');
    try {
      var resp = await axios.get(`${this.baseUrl}/find/all/destinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async findMyHotels() {
    try {
      let token = Cookies.get('grant_token');
      var resp = await axios.get(`${this.baseUrl}/fetch/my/hotels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async deleteHotel(id: number) {
    try {
      var token = Cookies.get('grant__token');
      var resp = await axios.delete(`${this.baseUrl}/delete/hotel`, {
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

  async updateHotel(hotel: Hotel, id: number) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      for (let i = 0; i < hotel.images.length; i++) {
        var keysHotel = Object.keys(hotel.images[i]);
        var valuesHotel: any = Object.values(hotel.images[i]);
        for (let j = 0; j < keysHotel.length; j++) {
          formData.append(keysHotel[j], valuesHotel[j]);
        }
      }
      formData.append('locationDescription', hotel.locationDescription);
      formData.append('contactEmail', hotel.contactEmail);
      formData.append('contactPhoneNumber', hotel.contactPhoneNumber);
      formData.append('contactPerson', hotel.contactPerson);
      formData.append('hotelCommission', `${hotel.hotelCommission}`);
      formData.append('destinations_id', `${hotel.destinations_id}`);
      formData.append('maximumRate', `${hotel.maximumRate}`);
      formData.append('minimumRoomRate', `${hotel.minimumRoomRate}`);
      formData.append(
        'hotelCancellationPolicy',
        `${hotel.hotelCancellationPolicy}`
      );
      formData.append('hotelMetaDescription', hotel.hotelMetaDescription);
      formData.append('hotelDescription', hotel.hotelDescription);
      formData.append('hotelName', hotel.hotelName);
      formData.append('thumbnail', hotel.thumbnail);

      var resp = await axios.post(`${this.baseUrl}/update/hotel`, formData, {
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

  async publishHotel(id: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.put(
        `${this.baseUrl}/publish/hotel`,
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
