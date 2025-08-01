import { Component } from '@angular/core';

@Component({
  selector: 'feature-patners',
  templateUrl: './feature-patners.component.html',
  styleUrl: './feature-patners.component.css'
})
export class FeaturePatnersComponent {
  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];
Patners = [
{
src:"../../../assets/patners/KQ.jpg",
name:"Kenya Airways"
},
{
src:"../../../assets/patners/Safari-bookings.jpg",
name:"Safari Bookings"
},
{
src:"../../../assets/patners/TOSK.jpg",
name:"TOSK"
},
{
  src:"../../../assets/patners/TripAdvisor.jpg",
  name:"Trip Advisor"
  },
  {
    src:"https://www.olankasafaris.com/assets/images/system/tra1.png?v1.0.9",
    name:"Tourism Regulatory Authority"
    }


]


}
