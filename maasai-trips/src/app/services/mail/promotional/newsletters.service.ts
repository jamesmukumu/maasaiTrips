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
  baseUrl = 'https://maasaitrips-2.onrender.com/api';

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

  async previewPromotionalNewsletter(promotion: Promotional) {
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

  async propagatePromotionalNewsletters(idNews: number, dest: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('newsLetterTemplate', `${idNews}`);
      formData.append('destinations', dest);

      var resp = await axios.post(
        'https://maasaitrips-2.onrender.com/api/propagate/promotional/newsletters',
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
}
