import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  goDest(){
    this.route.navigate(["/destinations"])
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
"destinationTitle":"Nakuru County",
"destinationSlug":""
},
{
"destinationTitle":"Samburu County",
"destinationSlug":"samburu_county67e68b1e3feba"
},
{
"destinationTitle":"Garisaa County",
"destinationSlug":""
},
{
"destinationTitle":"Eldama Ravine",
"destinationSlug":""
},

]

featureSafaris = [
{
safariTitle:"3 DAYS BUDGET LANDCRUISER SAFARI",
safariSlug:"3_days_budget_landcruiser_safari_tours_travel"
},
{
safariTitle:"3 DAYS BUDGET LANDCRUISER SAFARI TOURS TRAVEL",
safariSlug:"3_days_budget_landcruiser_safari_tours_travel"
},
{
safariTitle:"TSAVO JEEP SAFARIS 4 DAYS 4 NIGHT",
safariSlug:"3_days_budget_landcruiser_safari_tours_travel"
}


]




}
