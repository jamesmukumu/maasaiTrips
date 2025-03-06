import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface Promotional {
  Destinations: any[];
  HotDiscount: number;
  HotOfferDescription: string;
  HotOfferDiscount: number;
  SpecialDeal: string;
  SpecialDealDescription: string;
  SpecialDealDiscount: number;
  Title: string;
}
@Injectable({
  providedIn: 'root',
})
export class NewslettersService {
  baseUrl = 'http://localhost:8000/api';

  constructor() {}
  async saveNewsLetter(promotion: Promotional) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      for (let i = 0; i < promotion.Destinations.length; i++) {
        var keysPromotion = Object.keys(promotion.Destinations[i]);
        var valuesPromotion: any = Object.values(promotion.Destinations[i]);
        for (let j = 0; j < keysPromotion.length; j++) {
          formData.append(keysPromotion[j], valuesPromotion[j]);
        }
      }
      formData.append('hotDiscount', `${promotion.HotDiscount}`);
      formData.append('hotOffer', promotion.HotOfferDescription);
      formData.append('hotOfferDiscount', `${promotion.HotOfferDiscount}`);
      formData.append(
        'specialDealDescription',
        promotion.SpecialDealDescription
      );
      formData.append(
        'specialDiscountPrice',
        `${promotion.SpecialDealDiscount}`
      );
      formData.append('specialDeal', promotion.SpecialDeal);
      formData.append('Title', promotion.Title);
      var resp = await axios.post(
        `${this.baseUrl}/save/promotional/newsletters`,
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

  async previewPromotionalNewsletter(promotion: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      for (let i = 0; i < promotion.Destinations.length; i++) {
        var keysPromotion = Object.keys(promotion.Destinations[i]);
        var valuesPromotion: any = Object.values(promotion.Destinations[i]);
        for (let j = 0; j < keysPromotion.length; j++) {
          formData.append(keysPromotion[j], valuesPromotion[j]);
        }
      }
      formData.append('hotDiscount', `${promotion.HotDiscount}`);
      formData.append('hotOffer', promotion.HotOfferDescription);
      formData.append('hotOfferDiscount', `${promotion.HotOfferDiscount}`);
      formData.append(
        'specialDealDescription',
        promotion.SpecialDealDescription
      );
      formData.append(
        'specialDiscountPrice',
        `${promotion.SpecialDealDiscount}`
      );
      formData.append('specialDeal', promotion.SpecialDeal);
      formData.append('Title', promotion.Title);
      var resp = await axios.post(
        `${this.baseUrl}/preview/promotional/newsletter`,
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

  async previewPromotionalNewsletterEditor(promotion: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      for (let i = 0; i < promotion.Destinations.length; i++) {
        var keysPromotion = Object.keys(promotion.Destinations[i]);
        var valuesPromotion: any = Object.values(promotion.Destinations[i]);
        for (let j = 0; j < keysPromotion.length; j++) {
          formData.append(keysPromotion[j], valuesPromotion[j]);
        }
      }
      formData.append('hotDiscount', promotion.hotDiscount);
      formData.append('hotOffer', promotion.hotOffer);
      formData.append('hotOfferDiscount', `${promotion.hotOfferDiscount}`);
      formData.append(
        'specialDealDescription',
        promotion.specialDealDescription
      );
      formData.append(
        'specialDiscountPrice',
        `${promotion.specialDiscountPrice}`
      );
      formData.append('specialDeal', promotion.specialDeal);
      formData.append('Title', promotion.Title);
      var resp = await axios.post(
        `${this.baseUrl}/preview/promotional/newsletter`,
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
  async propagatePromotionalNewsletters(idNews: number, dest: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('newsLetterTemplate', `${idNews}`);
      formData.append('destinations', dest);

      var resp = await axios.post(
        'http://localhost:8000/api/propagate/promotional/newsletters',
        formData,
        {
          headers: {
            Authorization: 'Bearer' + ' ' + token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  async fetchPromotionalNewsletters() {
    try {
      var token = Cookies.get('grant_token');
      var response = await axios.get(
        `${this.baseUrl}/fetch/promotional/newsletter`,
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

  async deleteTemplateNewsLetter(id: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.delete(
        `${this.baseUrl}/delete/promotional/newsletter`,
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
