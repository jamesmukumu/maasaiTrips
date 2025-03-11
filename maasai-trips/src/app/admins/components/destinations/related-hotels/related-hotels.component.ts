import { Component,Input} from '@angular/core';

@Component({
  selector: 'related-hotels',
  templateUrl: './related-hotels.component.html',
  styleUrl: './related-hotels.component.css'
})
export class RelatedHotelsComponent {
@Input() hotelData:any
@Input() destinationName:string = ''



}
