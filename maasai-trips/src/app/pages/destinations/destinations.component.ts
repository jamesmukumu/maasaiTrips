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
goDestinations(id:any,title:any){  
this.router.navigate([`/destinations/${title}/${id}`])
}
sanitize(data:SafeHtml|any){
return this.sanitizer.bypassSecurityTrustHtml(data)
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
