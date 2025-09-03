import { Component,OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel,HotelsService } from '../../services/hotels.service';
import { DomSanitizer,SafeHtml,Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { ImageItem } from 'ng-gallery';
import {
  trigger,
  transition,
  keyframes,
  style,
  animate,
} from '@angular/animations';


@Component({
  selector: 'single-hotel',
  templateUrl: './single-hotel.component.html',
  styleUrl: './single-hotel.component.css',
  animations:[
    trigger('bounceRight', [
      transition('clear => visible', [
        style({
          opacity: 1,
          transform: 'translateX(-48px)',
        }),
        animate(
          '1.55s ease-in-out',
          style({ transform: 'translateX(0px)', opacity: 1 })
        ),
      ]),
    ]),
  ]
})
export class SingleHotelComponent {
  bgState: string = 'clear';
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];
  @ViewChild('bg') bgRef!: ElementRef;
  @ViewChild("contactRef", { read: ElementRef }) contactRef!: ElementRef;


contact_handler(event:any){
this.contactRef.nativeElement.scrollIntoView({
  behavior:"smooth",
  block:"start"
  })
}
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
  displayedColumns:string[] = ["roomType","maxOccupancy"]
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
book(){
  this.contactRef.nativeElement.scrollIntoView({
    behavior:"smooth",
  block:"start"
  })
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
  
    this.dataSource = new MatTableDataSource(data.rooms)
    this.fetchingDestination =  false 
  }
  }catch(err){
  
  console.error(err)
  }
  
  }
  
  
  bgBounce() {
    var observer = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          this.bgState = 'visible';
        } else {
          this.bgState = 'clear';
        }
      });
    });
    observer.observe(this.bgRef.nativeElement);
  }

  ngAfterViewInit() {
    this.bgBounce();
  }
  
  
  
  
  async ngOnInit(){
  this.router.paramMap.subscribe((data)=>{
  this.destinationsID = data.get("hotelSlug") ?? ""
  })
  await this.fetchDestinations()
  this.titlePage.setTitle(this.destinationData.hotelName+" | "+"Maasai MaraTrips")
  }
  
}
