import { Component,inject } from '@angular/core';
import {
  alertNewsLetters,
  NewslettersService,
} from '../../../../services/mail/alert/newsletters.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'alert-news',
  templateUrl: './alert-news.component.html',
  styleUrl: './alert-news.component.css',
})
export class AlertNewsComponent {
  readonly snack = inject(MatSnackBar)
  processing = false;
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

  async actualizeSaving() {
    try {
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
      var { message } = await this.alertsLetter.saveAlertsTemplate(payload);
      if(message == 'NewsLetter Saved'){
       this.snack.open(message,"Success".toUpperCase(),{
        horizontalPosition:"center",
        verticalPosition:"bottom"
       })
      }else{
        this.snack.open("Something Went wrong","Success".toUpperCase(),{
          horizontalPosition:"center",
          verticalPosition:"bottom"
         })
      }
    } catch (err) {
      console.error(err);
    }
  }

  constructor(private alertsLetter: NewslettersService) {}
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
}
