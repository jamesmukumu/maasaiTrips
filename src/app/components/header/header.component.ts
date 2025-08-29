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
      "destinationTitle":"Weather and Climate",
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
safariTitle:"5-Day Aberdare National Park and Nyeri Safari Itinerary".toLowerCase(),
safariSlug:"5_day_aberdare_national_park_and_nyeri_safari_itinerary"
},
{
safariTitle:"4 Days Maasai Mara Honeymoon/Anniversary Package".toLowerCase(),
safariSlug:"4_days_maasai_mara_honeymoonanniversary_package"
},
{
safariTitle:"3 Days 4 Nights Retreat Maasai Mara".toLowerCase(),
safariSlug:"3_days_4_nights_retreat_maasai_mara"
}


]

  // control dropdown visibility
  showAccommodations = false;

  toggleAccommodations() {
    this.showAccommodations = !this.showAccommodations;
  }


}
