import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';
export interface MailTemplate {
  subject: string;
  mailMessage: string;
  attachments?: any;
}
export interface Mail {
  message: string;
  emailTarget: string;
  subject: string;
  attachment: any;
  ccs?: string;
}

export interface Bulk {
  emailTemplate: number;
  destinations: string;
  attachments?: any;
}
export interface BulkMailUser {
  fullname: string;
  category: string;
  identificationNumber: string;
  phoneNumber: string;
  description?: string;
  email: string;
  identificationMethod: string;
  country?: string;
}
export interface newsLetter {
  Title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class MailServService {
  async saveNewsLetter(payload: newsLetter) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.post(
        'http://localhost:8000/api/save/news/letter',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateNewsletterTemplate(mailer: newsLetter, id: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.put(
        'http://localhost:8000/api/update/news/letter',
        mailer,
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

  async updateMailTemplate(mailer: MailTemplate, id: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.put(
        'http://localhost:8000/api/update/mail/template',
        mailer,
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

  async uploadImage(file: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('imageCld', file);
      var resp = await axios.post(
        'http://localhost:8000/api/save/to/cloud',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  async fetchNewsLetters() {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.get(
        'http://localhost:8000/api/fetch/my/alert/news/alerts',
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

  async previewLive(contentBody: string) {
    var token = Cookies.get('grant_token');
    try {
      var refinedBody = contentBody.replace(
        /<a\s+(?:[^>]*?\s+)?href=(["'])(http:\/\/res\.cloudinary\.com[^"']+)\1[^>]*>(.*?)<\/a>/gi,
        '<img src="$2" alt="$3" />'
      );
      var resp = await axios.post(
        'http://localhost:8000/api/live/preview',
        {
          content: refinedBody,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  constructor() {}
  async deleteBulk(id: any) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.delete('http://localhost:8000/api/delete/bulks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          queryid: id,
        },
      });
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  async updateBulkMail(bulk: BulkMailUser, mailerID: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.patch(
        'http://localhost:8000/api/update/bulk/users',
        bulk,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            bulkQuery: mailerID,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  async SaveBulkUser(Payload: BulkMailUser) {
    var token = Cookies.get('grant_token');
    try {
      var resp = await axios.post(
        'http://localhost:8000/api/save/email/bulk',
        Payload,
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

  async uploadCsv(csvFile: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('bulk_csv', csvFile);
      var resp = await axios.post(
        'http://localhost:8000/api/save/bulk/from/csv',
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
  async deleteTemplateNewsLetter(id: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.delete(
        'http://localhost:8000/api/delete/news/letter',
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
  async deleteTemplate(id: number) {
    try {
      var token = Cookies.get('grant_token');
      var resp = await axios.delete(
        'http://localhost:8000/api/delete/email/template',
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

  async fetchEmailTemplates() {
    try {
      var token = Cookies.get('grant_token');
      var response = await axios.get(
        'http://localhost:8000/api/fetch/email/templates',
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

  async fetchStatus() {
    try {
      var token = Cookies.get('grant_token');
      var response = await axios.get(
        'http://localhost:8000/api/fetch/mail/status',
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

  async sendBulksNewsletters(idNews: number, dest: any) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('newsLetterTemplate', `${idNews}`);
      formData.append('destinations', dest);

      var resp = await axios.post(
        'http://localhost:8000/api/send/alerts/newsletter',
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

  async sendBulks(bulks: Bulk) {
    try {
      var token = Cookies.get('grant_token');
      var formData = new FormData();
      formData.append('emailTemplate', `${bulks.emailTemplate}`);
      formData.append('destinations', bulks.destinations);
      formData.append('attachment', bulks.attachments);
      if (bulks.attachments) {
        for (let file of bulks.attachments) {
          formData.append('attachment', file);
        }
      }
      var resp = await axios.post(
        'http://localhost:8000/api/send/bulk/mails',
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
      console.error(err);
    }
  }

  async fetchBulks(url: string) {
    var token = Cookies.get('grant_token');

    try {
      var resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  async saveEmail(Mail: Mail) {
    var token = Cookies.get('grant_token');
    try {
      var formData = new FormData();
      formData.append('message', Mail.message);
      formData.append('subject', Mail.subject);
      formData.append('emailTarget', Mail.emailTarget);
      if (Mail.attachment.length && Mail.attachment) {
        for (let file of Mail.attachment) {
          formData.append('attachment', file);
        }
      }

      formData.append('ccs', Mail.ccs ?? '');

      var resp = await axios.post(
        'http://localhost:8000/api/send/email',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  async saveEmailTemplate(Temp: MailTemplate) {
    try {
      var token = Cookies.get('grant_token') ?? '';
      var resp = await axios.post(
        'http://localhost:8000/api/save/email/template',
        Temp,
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
