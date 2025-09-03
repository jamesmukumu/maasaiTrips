import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.css']
})
export class MapPickerComponent implements OnInit {
  @Output() coords = new EventEmitter<any>()

  sendCoordinates(){
   this.coords.emit(this.coordinates)
  }
  zoom = 10;
  center: google.maps.LatLngLiteral = { lat: -1.4818213663300381, lng:35.129968137079686 };
  coordinates: google.maps.LatLngLiteral | null = null;
  markerPositions: google.maps.LatLngLiteral[] = [];

  ngOnInit(): void {

    this.sendCoordinates()
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.coordinates = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.markerPositions = [this.coordinates];
    }
  this.sendCoordinates()
  }
}
