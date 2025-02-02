import { Component,ViewChild,AfterViewInit,ElementRef } from '@angular/core';
import { trigger,transition,keyframes,style,animate } from '@angular/animations';
import { Router } from '@angular/router';
interface accomodation {
  HotelName: string;
  HotelImagePath: string;
  HotelUniquePath: string;
  HotelID?:string
}

@Component({ 
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrl: './accomodations.component.css',
  animations: [
    trigger("bounceLeft", [
      transition("out => in", [
        style({
          opacity: 1,
          transform: "translateY(-45px)",
        }),
        animate(
          "2s ease-in-out",
          keyframes([
            
            style({ offset: 1, opacity: 1, transform: "translateY(0px)", easing: "ease-out" }),
          ])
        ),
      ]),
    ]),
  ]
  
})
export class AccomodationsComponent implements AfterViewInit{
@ViewChild("content") contentAnimate!:ElementRef
contentState:string = 'out'
goHotel(id?:string){
this.router.navigate([`/hotel/${id}`])
}
  allAccomodations: accomodation[] = [
    {
      HotelName: 'Mara Sweet Acacia lodge',
      HotelID:"679e7ed6840994da370c2584",
      HotelImagePath:
        '../../../assets/Accomodations/xMara,P20Maisha,P20Camp_120241011084806.webp.pagespeed.ic.pFB2QS8hXz.webp',
      HotelUniquePath: 'Mara Lounge',
    },
    {
      HotelName: 'Zebra plains mara camp',
      HotelID:'679e841a840994da370c258d',
      HotelImagePath:
        '../../../assets/Accomodations/xZebra,P20Plains,P20Mara,P20Camp_120241007163955.webp.pagespeed.ic.FsBOBodvI7.webp',
      HotelUniquePath: 'Zebra plains mara camp',
    },
    {
      HotelName: 'Karen Blixen Camp maasai mara',
      HotelID:"679e824e840994da370c258a",
      HotelImagePath:
        '../../../assets/Accomodations/xKaren,P20Blixen,P20Camp,P20Masai,P20Mara_120241008142708.webp.pagespeed.ic.1XuDhxMzqT.webp',
      HotelUniquePath: 'Karen Blixen',
    },
    {
      HotelName: 'Mara Serena Safari Lounge',
      HotelID:'679e80ba840994da370c2587',
      HotelImagePath:
        '../../../assets/Accomodations/xMara,P20Serena,P20Safari,P20Lodge_120241008170448.webp.pagespeed.ic.yRSZHceTCR.webp',
      HotelUniquePath: 'Mara Serena safari Lounge',
    },
    {
      HotelName: 'Bella Camp Mara',
      HotelID:"679dbec310c815c1d9c29ab4",
      HotelImagePath:
        '../../../assets/Accomodations/xBella,P20Camp,P20Mara_120241009113342.webp.pagespeed.ic.uyCcOyVUpT.webp',
      HotelUniquePath: 'Bella Camp mara',
    },
    {
      HotelName: 'Enkorok Mara Ltd Camp',
     
      HotelImagePath:
        '../../../assets/Accomodations/xEnkorok,P20Mara,P20Camp,P20Ltd_120241009150305.webp.pagespeed.ic.P_KMHYCw1n.webp',
      HotelUniquePath: 'Enkorok',
      HotelID:"679f5db26cf088bd78debe9b"
    },
    {
      HotelName: 'Ashnil Mara Camp',
      HotelID:"679f5b826cf088bd78debe98",
      HotelImagePath:
        '../../../assets/Accomodations/xAshnil,P20Mara,P20Camp_120241009151206.webp.pagespeed.ic.-jTKOPl0RR.webp',
      HotelUniquePath: 'Ashnil Mara Camp',
    },
    {
      HotelName: 'Mara Maisha Camp',
      HotelImagePath:
        '../../../assets/Accomodations/xMara,P20Maisha,P20Camp_120241011084806.webp.pagespeed.ic.pFB2QS8hXz.webp',
      HotelUniquePath: 'Mara maisha camp',
      HotelID:"679f58a56cf088bd78debe95"
    },
  ];
constructor(private router:Router){}
ngAfterViewInit(){
this.checkViewContent()
}
checkViewContent(){
var observer = new IntersectionObserver((entries)=>{
entries.map((entry)=>{
if(entry.isIntersecting){
this.contentState = 'in'
}else{
this.contentState = 'out'
}
})

})
observer.observe(this.contentAnimate.nativeElement)
}



}
