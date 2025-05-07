import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  baseUrl: string = 'https://maasaitrips-2.onrender.com/api';
  constructor() {}

  async addPackage(Payload: any) {
    try {
      let token = Cookies.get('grant_token');
      var formData = new FormData();

      for (let i = 0; i < Payload.images.length; i++) {
        var keysHotel = Object.keys(Payload.images[i]);
        var valuesHotel: any = Object.values(Payload.images[i]);
        for (let j = 0; j < keysHotel.length; j++) {
          formData.append(keysHotel[j], valuesHotel[j]);
        }
      }

      formData.append('packageTitle', Payload.title);
      formData.append('packageAbout', Payload.about);
      formData.append('packageOverview', Payload.overview);
      formData.append('imagePackage', Payload.image);
      formData.append('packageCharge', `${Payload.charges}`);
      formData.append('packageChargeCurrency', Payload.chargeCurrency);
      formData.append('startDate', Payload.startDate);
      formData.append('endDate', Payload.endDate);
      formData.append('destinations_id', `${Payload.destinations_id}`);
      formData.append('packageSpecialNotes', Payload.specialNotes);
      formData.append('budgetType', Payload.budgetType);
      formData.append('mode_transport', Payload.mode_transport);
      formData.append('package_categories_id', Payload.package_categories_id);
      formData.append('packageInclusives', Payload.packageInclusives);
      formData.append('packageExclusives', Payload.packageExclusives);

      var resp = await axios.post(
        `${this.baseUrl}/create/new/package`,
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

  async updatePackage(Payload: any, id: any) {
    try {
      let token = Cookies.get('grant_token');
      var formData = new FormData();

      if (Payload.images && Array.isArray(Payload.images)) {
        for (let i = 0; i < Payload.images.length; i++) {
          var keysHotel = Object.keys(Payload.images[i]);
          var valuesHotel: any = Object.values(Payload.images[i]);
          for (let j = 0; j < keysHotel.length; j++) {
            if (
              valuesHotel[j] !== undefined &&
              valuesHotel[j] !== null &&
              valuesHotel[j] !== ''
            ) {
              formData.append(keysHotel[j], valuesHotel[j]);
            }
          }
        }
      }

      const appendIfValid = (key: string, value: any) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== '' &&
          value !== 'undefined'
        ) {
          formData.append(key, value);
        }
      };

      appendIfValid('packageTitle', Payload.title);
      appendIfValid('packageAbout', Payload.about);
      appendIfValid('packageOverview', Payload.overview);
      appendIfValid('imagePackage', Payload.image);
      appendIfValid('packageCharge', Payload.charges);
      appendIfValid('packageChargeCurrency', Payload.chargeCurrency);
      appendIfValid('startDate', Payload.startDate);
      appendIfValid('endDate', Payload.endDate);
      appendIfValid('destinations_id', Payload.destinations_id);
      appendIfValid('packageSpecialNotes', Payload.specialNotes);
      appendIfValid('budgetType', Payload.budgetType);
      appendIfValid('mode_transport', Payload.mode_transport);
      appendIfValid('package_categories_id', Payload.package_categories_id);
      appendIfValid('packageInclusives', Payload.packageInclusives);
      appendIfValid('packageExclusives', Payload.packageExclusives);

      var resp = await axios.post(
        `${this.baseUrl}/update/package?id=${id}`,
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

  async fetchMyPackages() {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.get(`${this.baseUrl}/fetch/my/packages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async fetchPackageCategories() {
    try {
      let token = Cookies.get('grant_token');
      var response = await axios.get(
        `${this.baseUrl}/fetch/package/categories`,
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

  async adjustStatus_Packages(status: string, id: number) {
    try {
      var token = Cookies.get(`grant_token`);
      var response = await axios.put(
        `${this.baseUrl}/adjust/status/packages?id=${id}`,
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
  async fetchHotPackages() {
    try {
      var response = await axios.get(`${this.baseUrl}/fetch/display/packages`);
      return response.data;
    } catch (err) {
      return err;
    }
  }

  async fetchSingularPackages(packageSlug: string) {
    try {
      var resp = await axios.get(
        `${this.baseUrl}/fetch/singular/package?packageSlug=${packageSlug}`
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async createPackage_Category(title: string) {
    try {
      var token = Cookies.get('grant_token');
      var response = await axios.post(
        `${this.baseUrl}/create/package/category`,
        {
          title: title,
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
