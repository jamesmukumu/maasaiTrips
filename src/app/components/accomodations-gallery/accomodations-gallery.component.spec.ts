import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationsGalleryComponent } from './accomodations-gallery.component';

describe('AccomodationsGalleryComponent', () => {
  let component: AccomodationsGalleryComponent;
  let fixture: ComponentFixture<AccomodationsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccomodationsGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomodationsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
