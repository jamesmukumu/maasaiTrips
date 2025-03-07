import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';
export interface Room {
  roomType: string;
  bedBreakfast: string;
  halfBoard: string;
  fullBoard: string;
  allInclusive: string;
  singleRoomRateChild: number;
  doubleRoomRateChild: number;
  sharingRoomRateChildParent: number;
  roomCount: number;
  maximumRoomOccupancy: number;
  roomDescription: string;
  hotel_models_id: number;
  images: any[];
}

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  baseUrl = 'https://maasaitrips-2.onrender.com/api';
  constructor() {}

  async fetchHotels() {
    var token = Cookies.get('grant_token');
    try {
      var resp = await axios.get(`${this.baseUrl}/fetch/all/hotels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async saveRoom(room: Room) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      for (let i = 0; i < room.images.length; i++) {
        var keysRoom = Object.keys(room.images[i]);
        var valuesRoom: any = Object.values(room.images[i]);
        for (let j = 0; j < keysRoom.length; j++) {
          formData.append(keysRoom[j], valuesRoom[j]);
        }
      }
      formData.append('allInclusive', room.allInclusive);
      formData.append('bedBreakfast', room.bedBreakfast);
      formData.append('doubleRoomRateChild', `${room.doubleRoomRateChild}`);
      formData.append('hotels_models_id', `${room.hotel_models_id}`);
      formData.append('maximumRoomOccupancy', `${room.maximumRoomOccupancy}`);
      formData.append('roomCount', `${room.roomCount}`);
      formData.append(
        'sharingRoomRateChildParent',
        `${room.sharingRoomRateChildParent}`
      );
      formData.append('singleRoomRateChild', `${room.singleRoomRateChild}`);
      formData.append('fullBoard', room.fullBoard);
      formData.append('halfBoard', room.halfBoard);
      formData.append('roomDescription', room.roomDescription);
      formData.append('roomType', room.roomType);
      var response = await axios.post(
        `${this.baseUrl}/create/new/room`,
        formData,
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
}
