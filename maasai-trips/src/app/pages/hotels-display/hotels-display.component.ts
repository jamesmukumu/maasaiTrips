import { Component, OnInit, ViewChild, inject,ElementRef } from '@angular/core';
import { Hotel, HotelsService } from '../../services/hotels.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { RequestquoteComponent } from '../../components/requestquote/requestquote.component';
import { MatDialog } from '@angular/material/dialog';
import {
  trigger,
  transition,
  keyframes,
  style,
  animate,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { addEnquiry } from '../../redux/actions/enquiry.action';

@Component({
  selector: 'app-hotels-display',
  templateUrl: './hotels-display.component.html',
  styleUrl: './hotels-display.component.css',
 animations:[
    trigger('bounceRight', [
      transition('clear => visible', [
        style({
          opacity: 1,
          transform: 'translateX(-48px)'
        }),
        animate(
          '1.55s ease-in-out',
          style({ transform: 'translateX(0px)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class HotelsDisplayComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("bg") bgRef!:ElementRef
  readonly dialog = inject(MatDialog);

  bgState:string = 'clear'
  destinations: any;
  findingDestinations = false;
  hotelCount: number = 0;
  activePage: number = 1;
  pageSize: number = 3;
  requestingQuote = false;

  constructor(
    private hotel: HotelsService,
    private router: Router,
    private store: Store,
    private sanitizer: DomSanitizer
  ) {}
  goDestinations(id: any, title: any) {
    this.router.navigate([`/hotel/${title}/${id}`]);
  }
  capturePage(event: any) {
    console.log(event);
    var { length, pageSize } = event;

    this.activePage = pageSize;
    this.fetchDestinations();
  }
  sanitize(data: SafeHtml | any) {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }

  async fetchDestinations() {
    this.findingDestinations = true;
    try {
      var { data } = await this.hotel.fetchHotelsDisplay(
        `https://maasaitrips-2.onrender.com/api/fetch/display/hotels?page=${this.activePage}`
      );
      this.destinations = data;
      this.hotelCount = data.length;
      this.destinations.paginator = this.paginator;
      this.findingDestinations = false;
    } catch (err) {
      console.error(err);
    }
  }
  hotelSelected: string = 'PJ Hotels';
  requestQuote(hotelPicked: any) {
    this.hotelSelected = hotelPicked;
    this.store.dispatch(addEnquiry({ enquiryTitle: this.hotelSelected }));
    this.dialog.open(RequestquoteComponent);
  }

  ngOnInit() {
    this.fetchDestinations();
  }

  bgBounce(){
    var observer = new IntersectionObserver((entries)=>{
    entries.map((entry)=>{
    if(entry.isIntersecting){
    this.bgState = 'visible'
    }else{
    this.bgState = 'clear'
    }
    
    })
    
    
    })
    observer.observe(this.bgRef.nativeElement)
    }
    
    
    ngAfterViewInit(){
    this.bgBounce()
    }
}
