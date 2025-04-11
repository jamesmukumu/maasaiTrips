import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import {
  MailServService,
  newsLetter,
  
} from '../../../../services/mail/mail-serv.service';
import { NewslettersService,alertNewsLetters } from '../../../../services/mail/alert/newsletters.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { settoPreviews } from '../../../../redux/actions/preview.action';

@Component({
  selector: 'manage-newsletters',
  templateUrl: './manage-newsletters.component.html',
  styleUrl: './manage-newsletters.component.css',
  providers: [MessageService],
})
export class ManageNewslettersComponent {
  readonly snack = inject(MatSnackBar);
  displayedColumns: string[] = ['createdon', 'Title', 'Content', 'actions'];
  processing = false;
  rawData = []
  previewing = false
  alertsReady  = false
  dataSource: any;
  idSelected: number = 0;
  deleting = false;
  subject = '';
  updating = false;
  subj = '';
  messageEdit = '';
  previewData:any
  title: string = '';
  titleEntry1 = '';
  contentEntry1 = '';
  titleEntry2 = '';
  contentEntry2 = '';
  titleEntry3 = '';
  contentEntry3 = '';
  titleEntry4 = '';
  contentEntry4 = '';
  imageOne: any;
  imageTwo: any;
  imageThree: any;
  imageFour: any;
  constructor(private mail: MailServService, private msg: MessageService,private news:NewslettersService,private store:Store<{"preview":string}>,private router:Router) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  timeFormater(time: string) {
    return new Date(time).toString();
  }
  logger(event: any) {
    var { htmlValue } = event;
    this.messageEdit = htmlValue;
  }


 async previewingActualize(editContent:string){
this.messageEdit = editContent
this.processing = true
  this.previewData = await this.mail.previewLive(this.messageEdit)
  this.previewing = true
  this.processing = false
  }

  async updatingMailer() {
    try {
      this.updating = false;
      this.processing = true;
      var payload: alertNewsLetters = {
        Title: this.title,
        TitleOne: this.titleEntry1,
        imageOne: this.imageOne,
        FinalContentOne: this.contentEntry1,
        TitleTwo: this.titleEntry2,
        imageTwo: this.imageTwo,
        FinalContentTwo: this.contentEntry2,
        TitleThree: this.titleEntry3,
        imageThree: this.imageThree,
        FinalContentThree: this.contentEntry3,
        TitleFour: this.titleEntry4,
        imageFour: this.imageFour,
        FinalContentFour: this.contentEntry4,
      };
      var { message } = await this.news.updateAlertNewsletter(
        payload,
        this.idSelected
      );
      if (message == 'Template Updated') {
        this.snack.open('Templated update', 'UPDATED', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.FetchMails();
      } else {
        this.msg.add({
          severity: 'error',
          detail: message,
          life: 10000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  popUpdate(subject: string, id: number, initialMsg: string) {
   
    this.subj = subject;
    this.idSelected = id;
    this.messageEdit = initialMsg;
    var updateData = this.rawData.filter((dataFilter:any)=>dataFilter.id == id)[0]

    var {Title,TitleOne,TitleTwo,TitleThree,TitleFour,FinalContentOne,FinalContentTwo,FinalContentThree,FinalContentFour} = updateData
  this.title = Title
  this.titleEntry1 = TitleOne
  this.titleEntry2 = TitleTwo
  this.titleEntry3 = TitleThree
  this.titleEntry4 = TitleFour
  this.contentEntry1 = FinalContentOne
  this.contentEntry2 = FinalContentTwo
this.contentEntry3 = FinalContentThree
this.contentEntry4 = FinalContentFour

  this.updating = true;
  
  }

  popDelete(id: number, subject: string) {
    this.deleting = true;
    this.idSelected = id;
    this.subject = subject;
  }
  async delete() {
    this.processing = true;
    this.deleting = false;
    try {
      var { message } = await this.news.deleteTemplateNewsLetter(
        this.idSelected
      );
      if (message == 'Deleted') {
        this.snack.open('Delete', 'success'.toUpperCase(), {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.FetchMails();
      } else {
        this.msg.add({
          severity: 'error',
          detail: 'Somethin went wrong',
          life: 10000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
  async FetchMails() {
    this.processing = true;
    try {
      var { message, data } = await this.mail.fetchNewsLetters();
    this.rawData = data
    if(message=='You have no templates saved'){
    this.alertsReady = true
    this.processing = false
    }else{
this.dataSource = new MatTableDataSource(data);
this.dataSource.paginator = this.paginator;
this.processing = false;

}
    } catch (err) {
      console.error(err);
    }
  }
  ngOnInit() {
  this.FetchMails();
  }
  uploadImageOne(event: any) {
    var { currentFiles } = event;
    this.imageOne = currentFiles[0];
  }

  uploadImageTwo(event: any) {
    var { currentFiles } = event; 
    this.imageTwo = currentFiles[0];
  }

captureValueOne(event:any){
var {textValue} = event
this.contentEntry1 = textValue
}
captureValueTwo(event:any){
  var {textValue} = event
  this.contentEntry2 = textValue
  }

  captureValueThree(event:any){
    var {textValue} = event
    this.contentEntry3 = textValue
    }

    captureValueFour(event:any){
      var {textValue} = event
      this.contentEntry4 = textValue
      }
      

  uploadImageThree(event: any) {
    var { currentFiles } = event;
    this.imageThree = currentFiles[0];
  }

  uploadImageFour(event: any) {
    var { currentFiles } = event;
    this.imageFour = currentFiles[0];
  }
  
  async previewDataOther(element:any){
   
    var data = await this.news.previewAlertsEditorMode(element)

      this.store.dispatch(settoPreviews({previewData:data}))
      const url = this.router.createUrlTree(['/preview'], { 
        queryParams: { previewMode: 'AlertNewsLetters' } 
      }).toString();
      
      window.open(url, '_blank');
  }




}
