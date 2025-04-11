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
  latitude: number;
  longitude: number;
  images: any[];
}

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  constructor() {}
  baseUrl = 'https://maasaitrips-2.onrender.com/api';

  async saveHotel(hotel: any) {
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
      formData.append('latitude', `${hotel.latitude}`);
      formData.append('longitude', `${hotel.longitude}`);
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
      if (hotel.images.length > 0) {
        for (let i = 0; i < hotel.images.length; i++) {
          var keysHotel = Object.keys(hotel.images[i]);
          var valuesHotel: any = Object.values(hotel.images[i]);
          for (let j = 0; j < keysHotel.length; j++) {
            formData.append(keysHotel[j], valuesHotel[j]);
          }
        }
      }

      var appender = (key: string, value: string) => {
        if (
          key != undefined &&
          value != undefined &&
          key != '' &&
          value != ''
        ) {
          formData.append(key, value);
        }
      };

      appender('locationDescription', hotel.locationDescription);
      appender('contactEmail', hotel.contactEmail);
      appender('contactPhoneNumber', hotel.contactPhoneNumber);
      appender('contactPerson', hotel.contactPerson);
      appender('hotelCommission', `${hotel.hotelCommission}`);
      appender('destinations_id', `${hotel.destinations_id}`);
      appender('maximumRate', `${hotel.maximumRate}`);
      appender('minimumRoomRate', `${hotel.minimumRoomRate}`);
      appender('hotelCancellationPolicy', `${hotel.hotelCancellationPolicy}`);
      appender('hotelMetaDescription', hotel.hotelMetaDescription);
      appender('hotelDescription', hotel.hotelDescription);
      appender('hotelName', hotel.hotelName);
      appender('thumbnail', hotel.thumbnail);

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

  async unpublishHotel(id: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.put(
        `https://maasaitrips-2.onrender.com/api/unpublish/hotel`,
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

  async fetchDestinationsDisplay() {
    try {
      var resp = await axios.get(`${this.baseUrl}/fetch/destinations`);
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async fetchSingularDestinations(id: any) {
    try {
      var resp = await axios.get(`${this.baseUrl}/find/single/destination`, {
        params: {
          slug: id,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async deleteDestination(id: any) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.delete(`${this.baseUrl}/delete/destination`, {
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

  async publishDestination(id: any) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.put(
        `${this.baseUrl}/publish/destination`,
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

  async un_publishDestination(id: any) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.put(
        `${this.baseUrl}/unpublish/destination`,
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

  async fetchMyDestinations() {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.get(`${this.baseUrl}/fetch/my/destinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async saveDestination(destination: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      for (let i = 0; i < destination.images.length; i++) {
        var keysdestinations = Object.keys(destination.images[i]);
        var valuesdestinations: any = Object.values(destination.images[i]);
        for (let j = 0; j < keysdestinations.length; j++) {
          formData.append(keysdestinations[j], valuesdestinations[j]);
        }
      }
      formData.append('destinationTitle', destination.destinationTitle);
      formData.append('destinationAbout', destination.destinationAbout);
      formData.append(
        'destinationDescription',
        destination.destinationDescription
      );
      formData.append('thumbnail', destination.Thumbnail);
      var resp = await axios.post(
        `${this.baseUrl}/add/new/destination`,
        formData,
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

  async updateDestination(destination: any, id: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      for (let i = 0; i < destination.images.length; i++) {
        var keysdestinations = Object.keys(destination.images[i]);
        var valuesdestinations: any = Object.values(destination.images[i]);
        for (let j = 0; j < keysdestinations.length; j++) {
          formData.append(keysdestinations[j], valuesdestinations[j]);
        }
      }
      formData.append('destinationTitle', destination.destinationTitle);
      formData.append('destinationAbout', destination.destinationAbout ?? null);
      formData.append(
        'destinationDescription',
        destination.destinationDescription ?? null
      );
      formData.append('thumbnail', destination.Thumbnail);
      var resp = await axios.post(
        `${this.baseUrl}/update/destination?id=${id}`,
        formData,
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
  async fetchHotelsDisplay(url: string) {
    try {
      var resp = await axios.get(url, {});
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async fetchSingularHotel(id: any) {
    try {
      var resp = await axios.get(`${this.baseUrl}/fetch/hotel`, {
        params: {
          slug: id,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async findMyRooms() {
    try {
      let token = Cookies.get('grant_token');
      var resp = await axios.get(`${this.baseUrl}/find/my/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async adjustStatus_Destinations(status: string, id: number) {
    try {
      var token = Cookies.get(`grant_token`);
      var response = await axios.put(
        `${this.baseUrl}/adjust/status/destinations?id=${id}`,
        {
          actionPending: status,
        },
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

  async adjustStatus_Hotels(status: string, id: number) {
    try {
      var token = Cookies.get(`grant_token`);
      var response = await axios.put(
        `${this.baseUrl}/adjust/status/hotels?id=${id}`,
        {
          actionPending: status,
        },
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
