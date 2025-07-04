import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Hotel,HotelsService } from '../../services/hotels.service';
import { DomSanitizer,SafeHtml,Title } from '@angular/platform-browser';


@Component({
  selector: 'single-destination',
  templateUrl: './single-destination.component.html',
  styleUrl: './single-destination.component.css'
})
export class SingleDestinationComponent {
constructor(private titlePage:Title,private route:Router,private sanitizer:DomSanitizer,private router:ActivatedRoute,private hotel:HotelsService){}
destinationsID:any
fetchingDestination = false
destinationData:any
destinationPhoto:any 
destinationDescription:SafeHtml = ''
destinationAbout:SafeHtml = ''
relatedHotels:any
safaris:any


goPackage(slug: any) {
  window.open(`/safaris/${slug}`, '_blank');
}

async fetchDestinations(){
this.fetchingDestination = true
try{
var {data,message} = await this.hotel.fetchSingularDestinations(this.destinationsID)
if(message === 'Destination Fetched'){
  this.destinationData = data
  this.destinationPhoto = JSON.parse(data.destinationPhotos)
  this.destinationDescription = this.sanitizer.bypassSecurityTrustHtml(data.destinationDescription)
  this.destinationAbout = this.sanitizer.bypassSecurityTrustHtml(data.destinationAbout)
  this.relatedHotels = data.fetch_hotels
   this.safaris = data.packages
  this.fetchingDestination = false
}
}catch(err){

console.error(err)
}

}







async ngOnInit(){
this.router.paramMap.subscribe((data)=>{
this.destinationsID = data.get("destinationsid") ?? ""
})
await this.fetchDestinations()
this.titlePage.setTitle(`${this.destinationData.destinationTitle}`)

}





}
