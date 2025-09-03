import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-accomodations-gallery',
  templateUrl: './accomodations-gallery.component.html',
  styleUrl: './accomodations-gallery.component.css'
})
export class AccomodationsGalleryComponent {
  @Input() imgs:any
  responsiveOptions = [
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    }
  ];
}
