import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-map-picker-packages',
  templateUrl: './map-picker-packages.component.html',
  styleUrl: './map-picker-packages.component.css'
})
export class MapPickerPackagesComponent {
  @Output() coords = new EventEmitter<any>();

  zoom = 10;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  // Start & Finish
  start: google.maps.LatLngLiteral | null = null;
  finish: google.maps.LatLngLiteral | null = null;

  // To display markers
  markerPositions: google.maps.LatLngLiteral[] = [];

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      const clicked = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      if (!this.start) {
        // First click → set Start
        this.start = clicked;
      } else if (!this.finish) {
        // Second click → set Finish
        this.finish = clicked;
      } else {
        // If both exist, reset and set new Start
        this.start = clicked;
        this.finish = null;
      }

      // Update markers array
      this.markerPositions = [];
      if (this.start) this.markerPositions.push(this.start);
      if (this.finish) this.markerPositions.push(this.finish);

      // Emit both points
      this.coords.emit({ start: this.start, finish: this.finish });
    }
  }
}
