import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationsViewComponent } from './accomodations-view.component';

describe('AccomodationsViewComponent', () => {
  let component: AccomodationsViewComponent;
  let fixture: ComponentFixture<AccomodationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccomodationsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomodationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
