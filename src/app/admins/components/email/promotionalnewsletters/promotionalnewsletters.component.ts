import { Component,inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { NewslettersService,Promotional } from '../../../../services/mail/promotional/newsletters.service';


export interface destinations{
destinationTitle:string
destinationDescription:string
destinationImage:any
destinationPrice:number
}
import { Router } from '@angular/router';
import { settoPreviews } from '../../../../redux/actions/preview.action';
@Component({
  selector: 'promotionalnewsletters',
  templateUrl: './promotionalnewsletters.component.html',
  styleUrl: './promotionalnewsletters.component.css',
  providers:[MessageService]
})
export class PromotionalnewslettersComponent {
constructor(private news:NewslettersService,private msg:MessageService,private router:Router,private store:Store){}
readonly snack = inject(MatSnackBar)
Title:string = ''
specialDiscount:number = 0
processing = false
hotDiscount:number = 0
hotDiscountDescription:string = ''
specialDealTitle:string = ''
specialDealDescription:string = ''
specialDealDiscount:number = 0
editValues:any[] = []
Destinations:any[] = [
{destinationTitle1:"",destinationDescription1:"",destinationPrice1:0,destinationImage1:null}
]
addDestinations(){
var index = this.Destinations.length
this.Destinations.push({[`destinationTitle${index+1}`]:"",[`destinationDescription${index+1}`]:"",[`destinationPrice${index+1}`]:0,[`destinationImage${index}`]:null})

}
popDestintions(){
if(this.Destinations.length <= 1){
this.snack.open("Paragraphs cannot be less than one","Add More")
}else{
this.Destinations.pop() 
}
}

editorValue(content:any,index:number){
var {args} = content
this.Destinations[index][`destinationDescription${index+1}`] = args[0]
}
chooserFile(file:any,index:number){
  var {currentFiles} = file
  this.Destinations[index][`destinationImage${index+1}`] = currentFiles[0]
  }


async saveNewsLetter(){
this.processing = true
try{
var payload:Promotional = {
  Destinations:this.Destinations,
  HotDiscount:this.hotDiscount,
  HotOfferDescription:this.hotDiscountDescription,
  HotOfferDiscount:this.hotDiscount,
  SpecialDeal:this.specialDealTitle,
  SpecialDealDescription:this.specialDealDescription,
  SpecialDealDiscount:this.specialDiscount,
  Title:this.Title
}
var {message} = await this.news.saveNewsLetter(payload)
if(message == "created"){
  this.snack.open("NewsLetter Saved","Success 😁",{
  horizontalPosition:"center",
  verticalPosition:"bottom"
  })
  this.processing = false
}else{
  this.processing = false
this.msg.add({severity:"error",detail:message,life:11000})
}
}catch(err){
console.error(err)
}
}

async previewing(){
  try{
    var payload:Promotional = {
      Destinations:this.Destinations,
      HotDiscount:this.hotDiscount,
      HotOfferDescription:this.hotDiscountDescription,
      HotOfferDiscount:this.hotDiscount,
      SpecialDeal:this.specialDealTitle,
      SpecialDealDescription:this.specialDealDescription,
      SpecialDealDiscount:this.specialDiscount,
      Title:this.Title
    }
 var data = await  this.news.previewPromotionalNewsletter(payload)
 this.store.dispatch(settoPreviews({previewData:data}))
 const url = this.router.createUrlTree(['/preview'], { 
  queryParams: { previewMode: 'PromotionalNewsLetters' } 
}).toString();
window.open(url, '_blank');
}catch(err){
console.error(err)
}
}
}
