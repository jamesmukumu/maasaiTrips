import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPickerPackagesComponent } from './map-picker-packages.component';

describe('MapPickerPackagesComponent', () => {
  let component: MapPickerPackagesComponent;
  let fixture: ComponentFixture<MapPickerPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapPickerPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapPickerPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
