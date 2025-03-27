import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel,HotelsService } from '../../services/hotels.service';
import { DomSanitizer,SafeHtml,Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'single-hotel',
  templateUrl: './single-hotel.component.html',
  styleUrl: './single-hotel.component.css'
})
export class SingleHotelComponent {
  constructor(private titlePage:Title,private sanitizer:DomSanitizer,private router:ActivatedRoute,private hotel:HotelsService){}
  destinationsID:any
  fetchingDestination = false
  destinationData:any
  destinationPhoto:any 
  destinationDescription:SafeHtml = ''
  destinationAbout:SafeHtml = ''
  hotelMetaDescription:SafeHtml = ''
  relatedHotels:any
  dataSource:any = []
  displayedColumns:string[] = ["roomType","maxOccupancy","more"]
  showRoom = false
  roomData:any


  sanitize(data:SafeHtml|any){
    return this.sanitizer.bypassSecurityTrustHtml(data)
    }
  


  popRoom(element:any){
    this.roomData = element
  this.showRoom = true
  }

generateMaxOccupancy(count:number){
return new Array(count)
}

  async fetchDestinations(){
  this.fetchingDestination = true
  try{
  var {data,message,rooms} = await this.hotel.fetchSingularHotel(this.destinationsID)
  if(message === 'Hotel Fetched'){
    this.destinationData = data
    this.destinationPhoto = JSON.parse(data.imagesHotel)
    this.destinationDescription = this.sanitizer.bypassSecurityTrustHtml(data.locationDescription)
    this.destinationAbout = this.sanitizer.bypassSecurityTrustHtml(data.hotelDescription)
    this.hotelMetaDescription = this.sanitizer.bypassSecurityTrustHtml(data.hotelMetaDescription)
    console.log(data.rooms)
    this.dataSource = new MatTableDataSource(data.rooms)
    this.fetchingDestination =  false 
  }
  }catch(err){
  
  console.error(err)
  }
  
  }
  
  
  
  
  
  
  
  async ngOnInit(){
  this.router.paramMap.subscribe((data)=>{
  this.destinationsID = data.get("hotelSlug") ?? ""
  })
  await this.fetchDestinations()
  this.titlePage.setTitle(this.destinationData.hotelName+" | "+"Maasai MaraTrips")
  }
  
}
