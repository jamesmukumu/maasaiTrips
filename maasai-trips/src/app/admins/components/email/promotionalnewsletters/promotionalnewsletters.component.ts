import { Component } from '@angular/core';
export interface destinations{
destinationTitle:string
destinationDescription:string
destinationImage:any
destinationPrice:number
}
@Component({
  selector: 'promotionalnewsletters',
  templateUrl: './promotionalnewsletters.component.html',
  styleUrl: './promotionalnewsletters.component.css'
})
export class PromotionalnewslettersComponent {
Destinations:destinations[] = [
{destinationTitle:"",destinationDescription:"",destinationPrice:0,destinationImage:null}
]
addDestinations(){
this.Destinations.push({destinationTitle:"",destinationDescription:"",destinationPrice:0,destinationImage:null})
}
popDestintions(){
this.Destinations.pop() 
}



}
