import { Component,Input} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'related-hotels',
  templateUrl: './related-hotels.component.html',
  styleUrl: './related-hotels.component.css'
})
export class RelatedHotelsComponent {
@Input() hotelData:any
@Input() destinationName:string = ''
constructor(private router:Router){}

visitHotel(hotel:any){

this.router.navigate([`hotel/${hotel.hotelName}/${hotel.hotelSlug}`])
}
}
