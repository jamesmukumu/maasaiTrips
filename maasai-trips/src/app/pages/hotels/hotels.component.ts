import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { keyframes, style, trigger, animate, transition } from '@angular/animations';

@Component({
  selector: 'hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css',
  animations: [
    trigger('bounceTop', [
      transition('out => in', [
        style({ opacity: 0, transform: 'translateX(250px)' }), 
        animate(
          '2s',
          keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0.38, easing: 'ease-out' }),
            style({ transform: 'translateX(68px)', offset: 0.55, easing: 'ease-in' }),
            style({ transform: 'translateX(0)', offset: 0.72, easing: 'ease-out' }),
            style({ transform: 'translateX(32px)', offset: 0.81, easing: 'ease-in' }),
            style({ transform: 'translateX(0)', offset: 0.90, easing: 'ease-out' }),
            style({ transform: 'translateX(8px)', offset: 0.95, easing: 'ease-in' }),
            style({ transform: 'translateX(0)', offset: 1, easing: 'ease-out' })
          ])
        ),
      ]),
    ])
  ]
  
})
export class HotelsComponent implements OnInit, AfterViewInit {
  @ViewChild("part")patnerRef!:ElementRef;
  initialPatner: string = 'out';

  hotelId: string = '';

  hotelData: any;
  fetchingHotel: boolean = false;
  
  

  constructor(public route: ActivatedRoute, public hotel: HotelServiceService) {}

  checkPatner() {
    var observer = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          this.initialPatner = 'in';
        } else {
          this.initialPatner = 'out';
        }
      });
    });
    observer.observe(this.patnerRef.nativeElement);
  }

  ngAfterViewInit() {
    this.checkPatner();
  }

  fetchHotelData() {
    this.fetchingHotel = true;
    this.hotel.fetchHotel(this.hotelId).then((dataa) => {
      var { message, data } = dataa;
      if (message == 'Hotel found') {
        this.hotelData = data;
        this.fetchingHotel = false;
      }
    }).catch((err) => console.error(err));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      this.hotelId = data.get("hotelId") ?? '';
      console.log(this.hotelId);
    });
    this.fetchHotelData();
  }
}