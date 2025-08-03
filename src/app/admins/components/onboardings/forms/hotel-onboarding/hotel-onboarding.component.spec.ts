import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOnboardingComponent } from './hotel-onboarding.component';

describe('HotelOnboardingComponent', () => {
  let component: HotelOnboardingComponent;
  let fixture: ComponentFixture<HotelOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelOnboardingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
