import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel, HotelsService } from '../../services/hotels.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hotels-display',
  templateUrl: './hotels-display.component.html',
  styleUrl: './hotels-display.component.css',
})
export class HotelsDisplayComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  destinations: any;
  findingDestinations = false;
  hotelCount: number = 0;
  activePage: number = 1;
  pageSize: number = 3;

  constructor(
    private hotel: HotelsService,
    private router: Router,
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

  ngOnInit() {
    this.fetchDestinations();
  }
}
