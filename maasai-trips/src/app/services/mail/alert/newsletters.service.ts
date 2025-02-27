import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';

export interface alertNewsLetters {
  Title: string;
  TitleOne: string;
  FinalContentOne: string;
  TitleTwo: string;
  FinalContentTwo: string;
  TitleThree: string;
  FinalContentThree: string;
  TitleFour: string;
  FinalContentFour: string;
  imageOne: any;
  imageTwo: any;
  imageThree: any;
  imageFour: any;
}

@Injectable({
  providedIn: 'root',
})
export class NewslettersService {
  baseUrl = 'http://localhost:8000/api';
  constructor() {}

  async saveAlertsTemplate(AlertNewsLetter: alertNewsLetters) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('Title', AlertNewsLetter.Title);
      formData.append('TitleOne', AlertNewsLetter.TitleOne);
      formData.append('FinalContentOne', AlertNewsLetter.FinalContentOne);
      formData.append('TitleTwo', AlertNewsLetter.TitleTwo);
      formData.append('FinalContentTwo', AlertNewsLetter.FinalContentTwo);
      formData.append('TitleThree', AlertNewsLetter.TitleThree);
      formData.append('FinalContentThree', AlertNewsLetter.FinalContentThree);
      formData.append('TitleFour', AlertNewsLetter.TitleFour);
      formData.append('FinalContentFour', AlertNewsLetter.FinalContentFour);
      formData.append('imageOne', AlertNewsLetter.imageOne);
      formData.append('imageTwo', AlertNewsLetter.imageTwo);
      formData.append('imageThree', AlertNewsLetter.imageThree);
      formData.append('imageFour', AlertNewsLetter.imageFour);
      var resp = await axios.post(
        `${this.baseUrl}/save/alerts/newsLetter`,
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

  async updateAlertNewsletter(AlertNewsLetter: alertNewsLetters, id: number) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('Title', AlertNewsLetter.Title);
      formData.append('TitleOne', AlertNewsLetter.TitleOne);
      formData.append('FinalContentOne', AlertNewsLetter.FinalContentOne);
      formData.append('TitleTwo', AlertNewsLetter.TitleTwo);
      formData.append('FinalContentTwo', AlertNewsLetter.FinalContentTwo);
      formData.append('TitleThree', AlertNewsLetter.TitleThree);
      formData.append('FinalContentThree', AlertNewsLetter.FinalContentThree);
      formData.append('TitleFour', AlertNewsLetter.TitleFour);
      formData.append('FinalContentFour', AlertNewsLetter.FinalContentFour);
      if (AlertNewsLetter.imageOne) {
        formData.append('imageOne', AlertNewsLetter.imageOne);
      } else if (AlertNewsLetter.imageTwo) {
        formData.append('imageTwo', AlertNewsLetter.imageTwo);
      } else if (AlertNewsLetter.imageThree) {
        formData.append('imageThree', AlertNewsLetter.imageThree);
      } else if (AlertNewsLetter.imageFour) {
        formData.append('imageFour', AlertNewsLetter.imageFour);
      }

      var resp = await axios.post(
        `${this.baseUrl}/update/alerts/template`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          params: {
            id: id,
          },
        }
      );
      return resp.data;
    } catch (err: any) {
      return err;
    }
  }

  async previewAlerts(AlertNewsLetter: alertNewsLetters) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('TitleOne', AlertNewsLetter.TitleOne);
      formData.append('FinalContentOne', AlertNewsLetter.FinalContentOne);
      formData.append('TitleTwo', AlertNewsLetter.TitleTwo);
      formData.append('FinalContentTwo', AlertNewsLetter.FinalContentTwo);
      formData.append('TitleThree', AlertNewsLetter.TitleThree);
      formData.append('FinalContentThree', AlertNewsLetter.FinalContentThree);
      formData.append('TitleFour', AlertNewsLetter.TitleFour);
      formData.append('FinalContentFour', AlertNewsLetter.FinalContentFour);
      if (AlertNewsLetter.imageOne) {
        formData.append('imageOne', AlertNewsLetter.imageOne);
      } else if (AlertNewsLetter.imageTwo) {
        formData.append('imageTwo', AlertNewsLetter.imageTwo);
      } else if (AlertNewsLetter.imageThree) {
        formData.append('imageThree', AlertNewsLetter.imageThree);
      } else if (AlertNewsLetter.imageFour) {
        formData.append('imageFour', AlertNewsLetter.imageFour);
      }
      var resp = await axios.post(`${this.baseUrl}/preview/alerts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }


  async previewAlertsEditorMode(AlertNewsLetter: alertNewsLetters) {
    try {
      var token = Cookies.get('grant_token');
    
var resp = await axios.post(`${this.baseUrl}/preview/edit-mode/alerts`, AlertNewsLetter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      return err;
    }
  }
  async deleteTemplateNewsLetter(id: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.delete(`${this.baseUrl}/delete/news/alert`, {
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
}
