import { Component,ViewChild,AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

@Output() contactFormEmitter = new EventEmitter<string>()
  
contact_us(){
this.contactFormEmitter.emit("contact")
}
  goDest(path:string){
    this.route.navigate([`/${path}`])
  }
seeDrawer:boolean = false
toggle(){
this.seeDrawer = true
}
home(){
this.route.navigate(["/"])
}
navigate(){
this.route.navigate(["/safaris"])
}
accomodations(){
this.route.navigate(["/accomodations"])
}

constructor(private route:Router){}
featureDestinations = [
  {
    "destinationTitle":"About Maasai Mara",
    "destinationSlug":"the-pulse-of-africa-be-part-of-the-wildebeest-migration-spectacle"
    },
  {
    "destinationTitle":"Maasai Mara Conservancy",
    "destinationSlug":"top-things-to-do-in-masai-mara-a-kenya-safari-wildlife-adventure"
    },
  
      {
        "destinationTitle":"The Great Migration",
        "destinationSlug":"the-ultimate-hot-air-balloon-safari-experience-in-maasai-mara-kenya"
        },




]
viewHotel(urlPath:string){
window.open(urlPath,"_blank")
}


featureSafaris = [
  {
    safariTitle: "5-Day Ultimate Maasai Mara Safari Adventure".toLowerCase(),
    safariSlug: "5_day_ultimate_maasai_mara_safari_adventure"
  },
  {
    safariTitle: "4-Day Maasai Mara Honeymoon & Anniversary Escape".toLowerCase(),
    safariSlug: "4_day_maasai_mara_honeymoon_anniversary_escape"
  },
  {
    safariTitle: "3-Night Maasai Mara Wilderness Retreat".toLowerCase(),
    safariSlug: "3_night_maasai_mara_wilderness_retreat"
  }
]

  // control dropdown visibility
  showAccommodations = false;

  toggleAccommodations() {
    this.showAccommodations = !this.showAccommodations;
  }


}
