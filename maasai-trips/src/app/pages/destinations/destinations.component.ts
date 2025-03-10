import { Component,OnInit } from '@angular/core';
import { Hotel,HotelsService } from '../../services/hotels.service';
import { Router } from '@angular/router';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'destinations',
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css',
  
})
export class DestinationsComponent implements OnInit {
destinations:any[] = []
findingDestinations = false
constructor(private hotel:HotelsService,private router:Router,private sanitizer:DomSanitizer){}
goDestinations(id:any){  
this.router.navigate([`/destinations/${id}`])
}
transformDescription(description: string): string {
  return description ? description.replace(/\n/g, '<br>') : '';
}

async fetchDestinations(){
this.findingDestinations = true
try{
var {destinations} = await this.hotel.fetchDestinationsDisplay()
this.destinations = destinations
this.findingDestinations = false
}catch(err){
console.error(err)
}
}




ngOnInit(){
this.fetchDestinations()
}

}
