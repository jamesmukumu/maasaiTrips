import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  goDest(path:string){
    this.route.navigate([`${path}`])
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
this.route.navigate(["/hotels"])
}

constructor(private route:Router){}
featureDestinations = [
  {
    "destinationTitle":"Maasai Mara",
    "destinationSlug":"maasai_mara68663ba90ba07"
    },
  {
    "destinationTitle":"Diani",
    "destinationSlug":"diani687a393329ec1"
    },
    {
      "destinationTitle":"Amboseli",
      "destinationSlug":"amboseli687d3f7f1d8cb"
      },
      {
        "destinationTitle":"Tsavo West",
        "destinationSlug":"tsavo_west_national_park687e3df073803"
        },
{
"destinationTitle":"Nyeri",
"destinationSlug":"nyeri6863e1dc338f6"
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




}
