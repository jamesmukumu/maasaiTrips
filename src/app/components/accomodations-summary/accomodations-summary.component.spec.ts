import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationsSummaryComponent } from './accomodations-summary.component';

describe('AccomodationsSummaryComponent', () => {
  let component: AccomodationsSummaryComponent;
  let fixture: ComponentFixture<AccomodationsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccomodationsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomodationsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
