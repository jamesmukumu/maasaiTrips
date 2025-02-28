import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import {
  MailServService,
  Bulk,
} from '../../../../services/mail/mail-serv.service';
import { NewslettersService } from '../../../../services/mail/promotional/newsletters.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewBulkAddComponent } from '../new-bulk-add/new-bulk-add.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { UpdateBulkComponent } from '../update-bulk/update-bulk.component';
import { Store } from '@ngrx/store';
import { SaveToUpdateBulk } from '../../../../redux/actions/editBulk.action';
import { DeleteBulkComponent } from '../delete-bulk/delete-bulk.component';
@Component({
  selector: 'bulk-mails',
  templateUrl: './bulk-mails.component.html',
  styleUrl: './bulk-mails.component.css',
  providers: [MessageService],
})
export class BulkMailsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly dialog = inject(MatDialog);

  chooseAll = false;
  dataSource: any;
  displayedColumns: string[] = [
    'chooseAll',
    'choosen',
    'fullname',
    'category',
    'identificationNumber',
    'email',
    'country',
    'action',
  ];
  displayedColumnsSmallScreen: string[] = [
    'chooseAll',
    'choosen',

    'email',

    'action',
  ];
  processingTable = false;
  emailTemplates: any[] = [];
  promotionalTemplates: any[] = [];
  newsLetterTemplates: any[] = [];
  targetEmails: any;
  allEmails: any[] = [];
  newsletterType: string = '';
  choosenDefaults: any = [];
  attachments: any;
  sendingMails = false;
  subjectID = 0;
  csvFile: any;
  mailType = '';
  newsleteterid: number = 0;
  savingCsv = false;

  constructor(
    private mailer: MailServService,
    private msg: MessageService,
    private news: NewslettersService,
    private store: Store
  ) {}
  log(event: any) {
    var { source } = event;
    this.subjectID = source.value;
  }

  checkSingle(event: any, email: string) {
    var { checked } = event;
    if (checked) {
      this.choosenDefaults = [...this.choosenDefaults, email];
    } else {
      this.choosenDefaults.pop(email);
    }
  }
  choosenFile(event: any) {
    var { currentFiles } = event;
    this.attachments = currentFiles;
    console.log(this.attachments);
  }

  choosenCsvFile(event: any) {
    var { currentFiles } = event;
    this.csvFile = currentFiles[0];
  }
  popDelete(deleteData: any) {
    this.dialog.open(DeleteBulkComponent);
    var datatoUpdate = JSON.stringify(deleteData);
    this.store.dispatch(SaveToUpdateBulk({ bulkMail: datatoUpdate }));
  }
  popUpdate(updateData: any) {
    this.dialog.open(UpdateBulkComponent);
    var datatoUpdate = JSON.stringify(updateData);
    this.store.dispatch(SaveToUpdateBulk({ bulkMail: datatoUpdate }));
  }

  async sendBulks() {
    this.sendingMails = true;
    try {
      var payload: Bulk = {
        emailTemplate: this.subjectID,
        destinations: this.choosenDefaults.join(),
        attachments: this.attachments,
      };
      var resp = await this.mailer.sendBulks(payload);
      var { message } = resp;
      if (message == 'Sent') {
        this.msg.add({
          severity: 'success',
          detail: 'Emails Propagated',
          life: 10000,
        });
        this.sendingMails = false;
      } else {
        this.msg.add({
          severity: 'error',
          detail: 'Error sending mail',
          life: 10000,
        });
        this.sendingMails = false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async saveBulksCsv() {
    try {
      this.savingCsv = true;
      var { message } = await this.mailer.uploadCsv(this.csvFile);
      if (message == 'Data Saved') {
        this.msg.add({ severity: 'success', detail: 'Uploaded', life: 11000 });
        this.savingCsv = false;
      } else {
        this.msg.add({
          severity: 'error',
          detail: 'Something went wrong',
          life: 11000,
        });
        this.savingCsv = false;
      }
    } catch (err) {
      console.error(err);
    }
  }
  async sendBulksNewsTemplates() {
    this.sendingMails = true;
    try {
      var payload: Bulk = {
        emailTemplate: this.subjectID,
        destinations: this.choosenDefaults.join(),
        attachments: this.attachments,
      };
      var resp = await this.mailer.sendBulksNewsletters(
        this.newsleteterid,
        this.choosenDefaults
      );
      var { message } = resp;
      if (message == 'Emails propagated') {
        this.msg.add({
          severity: 'success',
          detail: 'Emails Propagated',
          life: 10000,
        });
        this.sendingMails = false;
      } else {
        this.msg.add({
          severity: 'error',
          detail: 'Error sending mail',
          life: 10000,
        });
        this.sendingMails = false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async sendPromotionalNewsTemplates() {
    this.sendingMails = true;
    try {
      var payload: Bulk = {
        emailTemplate: this.subjectID,
        destinations: this.choosenDefaults.join(),
        attachments: this.attachments,
      };
      var resp = await this.news.propagatePromotionalNewsletters(
        this.newsleteterid,
        this.choosenDefaults
      );
      var { message } = resp;
      if (message == 'Emails propagated') {
        this.msg.add({
          severity: 'success 😁',
          detail: 'Emails Propagated',
          life: 10000,
        });
        this.sendingMails = false;
      } else {
        this.msg.add({
          severity: 'error',
          detail: 'Error sending mail',
          life: 10000,
        });
        this.sendingMails = false;
      }
    } catch (err) {
      console.error(err);
    }
  }
  openBulk() {
    this.dialog.open(NewBulkAddComponent);
  }
  someEvent(event: any) {
    var { checked } = event;
    this.chooseAll = checked;
    this.choosenDefaults = this.allEmails;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchBulkMails() {
    this.processingTable = true;
    this.mailer
      .fetchBulks('https://maasaitrips-2.onrender.com/api/fetch/bulk/emails')
      .then((dataa) => {
        var {
          message,
          data,
          currentPage,
          nextPage,
          emailTemps,
          alertnewsLetters,
          promotional,
        } = dataa;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.emailTemplates = emailTemps;
        this.newsLetterTemplates = alertnewsLetters;
        this.promotionalTemplates = promotional;
        this.processingTable = false;
        for (let mailData of data) {
          var { email } = mailData;
          this.allEmails.push(email);
        }
        console.log(this.allEmails);
      })
      .catch((err) => console.error(err));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.fetchBulkMails();
  }
  fullName: string = '';
}
