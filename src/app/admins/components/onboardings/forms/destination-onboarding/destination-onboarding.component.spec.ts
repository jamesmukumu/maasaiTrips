import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationOnboardingComponent } from './destination-onboarding.component';

describe('DestinationOnboardingComponent', () => {
  let component: DestinationOnboardingComponent;
  let fixture: ComponentFixture<DestinationOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationOnboardingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestinationOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
