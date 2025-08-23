import { Component, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements AfterViewInit, OnChanges {
  @ViewChild(GoogleMap) map!: GoogleMap;

  @Input() origin: google.maps.LatLngLiteral | null = null;
  @Input() destination: google.maps.LatLngLiteral | null = null;

  center: google.maps.LatLngLiteral = { lat: -1.2921, lng: 36.8219 };

  private drawRoute() {
    if (!this.map?.googleMap || !this.origin || !this.destination) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map.googleMap);

    directionsService.route(
      {
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  }

  ngAfterViewInit() {
  
    setTimeout(() => this.drawRoute(), 500);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['origin'] || changes['destination']) && this.map) {
      this.drawRoute();
    }
  }
}
